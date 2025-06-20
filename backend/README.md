# Content Guardian Shield - Backend

This is the Python backend for the Content Guardian Shield project, providing blockchain-based content registration, verification, and licensing services.

## Features

- Content registration on Ethereum blockchain
- IPFS storage integration
- Content verification using AI-powered similarity detection
- License management system
- RESTful API endpoints

## Prerequisites

- Python 3.8 or higher
- Node.js and npm (for frontend)
- Ethereum node (local or Infura)
- IPFS node (Infura)

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration

4. Set up the database:
```bash
python scripts/init_db.py
```

## Running the Backend

1. Start the Flask development server:
```bash
python app.py
```

The server will start on http://localhost:5000

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

## Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black .
flake8
```

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .env               # Environment variables
├── data/              # Data storage
├── contracts/         # Smart contract ABIs
└── tests/            # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 