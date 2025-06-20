# Content Guardian Shield

A blockchain-based content protection and licensing platform that helps creators protect their digital content and manage licenses.

## Features

- Content Registration on Ethereum Blockchain
- IPFS Storage Integration
- AI-Powered Content Verification
- License Management System
- Modern React Frontend
- Python Flask Backend

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm 7 or higher
- Ethereum node (local or Infura)
- IPFS node (Infura)

## Quick Start

### Windows
```bash
# Run the setup script
setup.bat

# Start the backend (in a new terminal)
cd backend
venv\Scripts\activate
python app.py

# Start the frontend (in another terminal)
npm run dev
```

### Linux/Mac
```bash
# Make the setup script executable
chmod +x setup.sh

# Run the setup script
./setup.sh

# Start the backend (in a new terminal)
cd backend
source venv/bin/activate
python app.py

# Start the frontend (in another terminal)
npm run dev
```

## Project Structure

```
content-guardian-shield/
├── backend/                 # Python Flask backend
│   ├── app.py              # Main Flask application
│   ├── contracts/          # Smart contracts
│   ├── data/               # Data storage
│   ├── scripts/            # Utility scripts
│   └── tests/              # Backend tests
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── services/           # API services
│   └── App.tsx            # Main App component
└── package.json           # Frontend dependencies
```

## Configuration

1. Copy `backend/.env.example` to `backend/.env`
2. Update the following variables in `.env`:
   - `ETHEREUM_NODE_URL`: Your Ethereum node URL
   - `IPFS_NODE_URL`: Your IPFS node URL
   - `SECRET_KEY`: A secure secret key for Flask

## Development

### Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python app.py
```

### Frontend
```bash
npm run dev
```

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
npm test
```

## API Endpoints

### Content Registration
- POST `/api/content/register`
  - Register new content on the blockchain
  - Required fields: content, title, type

### Content Verification
- POST `/api/content/verify`
  - Verify content ownership
  - Required fields: content, type

### License Management
- POST `/api/licenses/create`
  - Create a new license
  - Required fields: contentId, licenseType, permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
