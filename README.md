
# Clinca


This project represents an advanced management system tailored for a surgical clinic with specialized focus on enhancing operational efficiency. Boasting a sophisticated architecture, the system caters to the needs of five distinct departments within the clinic: cardiology, neurology, urology, rheumatology, and ENT (Ear, Nose, and Throat). Seamlessly integrating patient appointment scheduling, meticulous medical record management, and tailored workflows for each department, this comprehensive solution is designed to elevate the clinic's overall functionality and provide a seamless experience for both healthcare providers and patients.


## Technologies Used

- **Frontend:**
  - React with Vite
  - Bootstrap for styling
  - Sass for enhanced styling
  - Auth0 for secure authentication
  -Type Script for more robust code
  - React Bootsrap for styled components

  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="react" width="10%"> <img src="https://vitejs.dev/logo-with-shadow.png" alt="vite" width="10%"> <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="10%"> <img src="https://sass-lang.com/assets/img/styleguide/seal-color.png" alt="Sass" width="10%"> <img src="https://cdn.freebiesupply.com/logos/large/2x/auth0-logo-png-transparent.png" alt="Auth0" width="10%"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxVoR1RTXjfthNkz2h5asySeOZIijCLDDI4Xth0JoW9w&s" alt="TypeScript" width="10%"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAfkRRnU5vmZJvedYJP3bqZ4ydbM9rh3mnLQjswjCVA&s" alt="React-bootstrap" width="10%">

- **Backend:**
  - Django as the server
  - Python as the language used
  - SQLite as the database
  - Railway to deploy the django app
    
  <img src="https://www.djangoproject.com/m/img/logos/django-logo-negative.png" alt="django" width="10%"><img src="https://sqlite.org/forum/logo?id=603c155e" alt="sqlite" width="10%"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" alt="Python" width="10%"> <img src="https://railway.app/brand/logo-dark.svg" alt="railway" width="10%">
  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

- Node.js and npm (for the frontend)
- Python and pip (for the backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RamyBouchareb25/clinica.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the frontend development server:
   ```bash
   npm run dev
   ```

5. Open a new terminal window, navigate to the backend directory, and create a virtual environment:
   ```bash
   python -m venv venv
   ```

6. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

7. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

8. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

9. Run the backend server:
   ```bash
   cd backend
   python manage.py runserver
   ```

10. Open your browser and go to `http://localhost:8080` to view the app.

## Usage

Explain how to use the app once it's running.

## Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the project.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.
