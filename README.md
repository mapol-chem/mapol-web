## Development with Docker

Start the Development Environment

`docker compose up --build`

-Build the frontend and backend images
-Start the containers with hot-reloading enabled

Create a .env file in the frontend directory:

`VITE_FLASK_API_URL=http://localhost:8000`

Rebuild Only One Service

`docker compose up --build frontend`

`docker compose up --build backend`

Stop the App

`docker compose down`

Access the App

Frontend: http://localhost:5173/mapol-web/
Backend API: http://localhost:8000