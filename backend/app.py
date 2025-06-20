from flask import Flask, request, jsonify
from flask_cors import CORS
from web3 import Web3
import ipfshttpclient
import json
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from PIL import Image
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Web3
w3 = Web3(Web3.HTTPProvider(os.getenv('ETHEREUM_NODE_URL', 'http://localhost:8545')))

# Initialize IPFS client
ipfs_client = ipfshttpclient.connect('/dns/ipfs.infura.io/tcp/5001/https')

# Load contract ABI and address
with open('contracts/ContentGuardian.json') as f:
    contract_data = json.load(f)
    contract_abi = contract_data['abi']
    contract_address = contract_data['address']

# Initialize contract
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

class ContentManager:
    def __init__(self):
        self.contents = {}
        self.load_contents()

    def load_contents(self):
        try:
            with open('data/contents.json', 'r') as f:
                self.contents = json.load(f)
        except FileNotFoundError:
            self.contents = {}
            self.save_contents()

    def save_contents(self):
        os.makedirs('data', exist_ok=True)
        with open('data/contents.json', 'w') as f:
            json.dump(self.contents, f)

content_manager = ContentManager()

@app.route('/api/content/register', methods=['POST'])
def register_content():
    try:
        data = request.json
        content = data.get('content')
        title = data.get('title')
        content_type = data.get('type')

        if not all([content, title, content_type]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Generate content hash
        content_hash = w3.keccak(text=content).hex()

        # Store content on IPFS
        ipfs_hash = ipfs_client.add_json({
            'content': content,
            'title': title,
            'type': content_type,
            'timestamp': datetime.utcnow().isoformat()
        })

        # Register on blockchain
        tx_hash = contract.functions.registerContent(
            content_hash,
            ipfs_hash,
            title,
            content_type
        ).transact({'from': w3.eth.accounts[0]})

        # Store locally
        content_id = str(len(content_manager.contents) + 1)
        content_manager.contents[content_id] = {
            'id': content_id,
            'title': title,
            'content': content,
            'type': content_type,
            'content_hash': content_hash,
            'ipfs_hash': ipfs_hash,
            'blockchain_tx': tx_hash.hex(),
            'timestamp': datetime.utcnow().isoformat()
        }
        content_manager.save_contents()

        return jsonify({
            'contentId': content_id,
            'timestamp': content_manager.contents[content_id]['timestamp'],
            'transactionHash': tx_hash.hex()
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/content/verify', methods=['POST'])
def verify_content():
    try:
        data = request.json
        content = data.get('content')
        content_type = data.get('type')

        if not all([content, content_type]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Generate content hash
        content_hash = w3.keccak(text=content).hex()

        # Find matching content
        best_match = None
        highest_similarity = 0

        for content_id, stored_content in content_manager.contents.items():
            if stored_content['type'] == content_type:
                if content_type == 'text':
                    # Text similarity using TF-IDF and cosine similarity
                    vectorizer = TfidfVectorizer()
                    try:
                        tfidf_matrix = vectorizer.fit_transform([content, stored_content['content']])
                        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
                        if similarity > highest_similarity:
                            highest_similarity = similarity
                            best_match = stored_content
                    except:
                        continue
                elif content_type == 'image':
                    # Image similarity using perceptual hashing
                    try:
                        img1 = Image.open(content)
                        img2 = Image.open(stored_content['content'])
                        similarity = compare_images(img1, img2)
                        if similarity > highest_similarity:
                            highest_similarity = similarity
                            best_match = stored_content
                    except:
                        continue

        if best_match:
            return jsonify({
                'matchPercentage': float(highest_similarity * 100),
                'owner': best_match['owner'],
                'registrationDate': best_match['timestamp']
            })
        else:
            return jsonify({
                'matchPercentage': 0,
                'message': 'No matching content found'
            })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def compare_images(img1, img2):
    # Resize images to same size
    img1 = img1.resize((8, 8))
    img2 = img2.resize((8, 8))
    
    # Convert to grayscale
    img1 = img1.convert('L')
    img2 = img2.convert('L')
    
    # Convert to numpy arrays
    arr1 = np.array(img1)
    arr2 = np.array(img2)
    
    # Calculate difference
    diff = np.abs(arr1 - arr2)
    
    # Calculate similarity (1 - normalized difference)
    similarity = 1 - (diff.sum() / (8 * 8 * 255))
    return similarity

@app.route('/api/licenses/create', methods=['POST'])
def create_license():
    try:
        data = request.json
        content_id = data.get('contentId')
        license_type = data.get('licenseType')
        permissions = data.get('permissions')

        if not all([content_id, license_type, permissions]):
            return jsonify({'error': 'Missing required fields'}), 400

        if content_id not in content_manager.contents:
            return jsonify({'error': 'Content not found'}), 404

        # Generate license ID
        license_id = f"LIC-{len(content_manager.contents[content_id].get('licenses', [])) + 1}"
        
        # Create license
        license_data = {
            'id': license_id,
            'type': license_type,
            'permissions': permissions,
            'created_at': datetime.utcnow().isoformat(),
            'expiry_date': (datetime.utcnow() + timedelta(days=30)).isoformat()
        }

        # Store license
        if 'licenses' not in content_manager.contents[content_id]:
            content_manager.contents[content_id]['licenses'] = []
        content_manager.contents[content_id]['licenses'].append(license_data)
        content_manager.save_contents()

        return jsonify({
            'licenseId': license_id,
            'licenseUrl': f"/licenses/{license_id}",
            'expiryDate': license_data['expiry_date']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 