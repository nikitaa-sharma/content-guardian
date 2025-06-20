import pytest
from app import app
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_register_content(client):
    test_content = {
        'content': 'Test content',
        'title': 'Test Title',
        'type': 'text'
    }
    response = client.post('/api/content/register',
                          data=json.dumps(test_content),
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'contentId' in data
    assert 'timestamp' in data
    assert 'transactionHash' in data

def test_verify_content(client):
    test_content = {
        'content': 'Test content',
        'type': 'text'
    }
    response = client.post('/api/content/verify',
                          data=json.dumps(test_content),
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'matchPercentage' in data
    assert 'owner' in data
    assert 'registrationDate' in data

def test_create_license(client):
    test_license = {
        'contentId': '1',
        'licenseType': 'commercial',
        'permissions': ['read', 'write']
    }
    response = client.post('/api/licenses/create',
                          data=json.dumps(test_license),
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'licenseId' in data
    assert 'licenseUrl' in data
    assert 'expiryDate' in data

def test_invalid_content_registration(client):
    test_content = {
        'title': 'Test Title',
        'type': 'text'
    }
    response = client.post('/api/content/register',
                          data=json.dumps(test_content),
                          content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data 