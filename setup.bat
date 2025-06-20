@echo off
echo Setting up Content Guardian Shield...

:: Create and activate Python virtual environment
echo Setting up Python environment...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt

:: Initialize database
echo Initializing database...
python scripts\init_db.py

:: Install frontend dependencies
echo Setting up frontend...
cd ..
npm install

:: Create .env file if it doesn't exist
if not exist backend\.env (
    echo Creating .env file...
    copy backend\.env.example backend\.env
    echo Please update the .env file with your configuration
)

echo Setup complete!
echo To run the project:
echo 1. Start the backend: cd backend ^&^& venv\Scripts\activate ^&^& python app.py
echo 2. Start the frontend: npm run dev 