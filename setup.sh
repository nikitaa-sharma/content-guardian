#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up Content Guardian Shield...${NC}"

# Create and activate Python virtual environment
echo -e "${GREEN}Setting up Python environment...${NC}"
cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows
pip install -r requirements.txt

# Initialize database
echo -e "${GREEN}Initializing database...${NC}"
python scripts/init_db.py

# Install frontend dependencies
echo -e "${GREEN}Setting up frontend...${NC}"
cd ..
npm install

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo -e "${GREEN}Creating .env file...${NC}"
    cp backend/.env.example backend/.env
    echo "Please update the .env file with your configuration"
fi

echo -e "${BLUE}Setup complete!${NC}"
echo -e "To run the project:"
echo -e "1. Start the backend: cd backend && source venv/Scripts/activate && python app.py"
echo -e "2. Start the frontend: npm run dev" 