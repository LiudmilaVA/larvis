# Project Setup Guide

Before setting up the project, ensure you have the following installed:

- Node.js v18.18.0 → Check version with: node -v

- Docker Desktop → Ensure it is installed and running.

## Installation Steps

1. **Install Frontend Dependencies**

Navigate to the frontend folder and install the required dependencies:

```bash
    cd frontend
    npm install
```

2. **Start Backend with Docker**

Navigate to the larvis/ directory and run:

```bash
    cd larvis
    docker compose up --build
```

This will build and run the Frontend Application.

3. **Access the Application**

Frontend: http://localhost:5173/

Backend: http://localhost:8080
