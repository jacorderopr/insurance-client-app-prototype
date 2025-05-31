# Insurance Client Management Web App Prototype

This project is a prototype web application designed for an insurance company to manage its clients. It features core functionalities like viewing a client list, seeing detailed client information, and updating client profile pictures.

---
## Prerequisites 🛠️

Before you begin, make sure you have the following installed on your system:

* **Git:** For cloning the repository.
* **Docker and Docker Compose:** Essential for running the application services in isolated containers. Docker Desktop is highly recommended for macOS and Windows.
* **Java JDK (Version 17 or later):** Required if you plan to build or run the backend Java application outside of Docker, or specifically to generate the Maven wrapper if it's missing.
* **Apache Maven:** Required only if the Maven wrapper files (`mvnw` and the `.mvn` directory) are not present in the `backend` directory and you need to generate them using a global Maven installation.
* **Node.js and npm:** Required if you plan to manage frontend dependencies or run the Next.js development server directly on your host machine (outside of Docker).

---
## Getting Started 🚀

Follow these steps to get the project up and running on your local machine after cloning the repository.

### 1. Clone the Repository

First, clone the project repository to your local machine:
```bash
git clone <your-repository-url>
cd insurance_client_app_prototype
```
(Replace `<your-repository-url>` with the actual URL of your Git repository.)

### 2. Backend Setup (Maven Wrapper)

The backend is a Spring Boot application built with Maven. We use the Maven Wrapper (`mvnw`) to ensure consistent builds across different development environments. The Docker build for the backend relies on these wrapper files.

* **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
* **Check for Maven Wrapper:** Look for a file named `mvnw` (for macOS/Linux) or `mvnw.cmd` (for Windows), and a directory named `.mvn`.
* **If `mvnw` is NOT present:** You'll need to generate it. This requires having Apache Maven installed globally on your system.
    ```bash
    # Ensure you are in the 'backend' directory
    mvn wrapper:wrapper
    ```
    This command will download and add the `mvnw` script, `mvnw.cmd`, and the `.mvn` directory (containing wrapper configurations) to your `backend` project.
* **Make `mvnw` executable (for macOS/Linux):** If `mvnw` was just generated or if it was cloned without execute permissions:
    ```bash
    chmod +x ./mvnw
    ```
* **Navigate back to the project root directory:**
    ```bash
    cd ..
    ```

### 3. Frontend Setup (Dependency Sanity Check)

The frontend is a Next.js application. The `frontend/package.json` file lists the necessary dependencies. The `frontend/package-lock.json` file ensures consistent dependency installation.
* The Docker build process for the frontend (`frontend/Dockerfile.dev`) handles `npm install` based on these files.
* If you wish to ensure `package-lock.json` is up-to-date locally or if you plan to run the frontend outside Docker, you can optionally run:
    ```bash
    cd frontend
    npm install
    cd ..
    ```
    This step is generally not strictly necessary if you are only running the project via Docker Compose, as the Docker build will manage frontend dependencies.

### 4. Run with Docker Compose 🐳

Docker Compose will build the Docker images for the frontend and backend services (if they don't already exist or if changes are detected) and then start all defined services (frontend, backend, and the PostgreSQL database).

* **From the project root directory (`insurance_client_app_prototype`):**
    ```bash
    docker-compose up --build
    ```
    * `--build`: This flag tells Docker Compose to rebuild the images before starting the containers. Use it the first time you run the project, or whenever you make changes to the `Dockerfile`s, or to application code/dependencies that would require a new image.
    * This process might take a few minutes, especially the first time, as Docker needs to download base images and build your application images. You'll see log output from all services in your terminal.

### 5. Accessing the Application 🌐

Once the Docker containers are up and running successfully:

* **Frontend (Next.js Web App):**
    Open your web browser and navigate to: `http://localhost:3000/clients`
* **Backend API (Spring Boot):**
    The backend API is accessible at `http://localhost:8080/api`. For example:
    * To get a list of all clients: `http://localhost:8080/api/clients`
    * To get details for client with ID 1: `http://localhost:8080/api/clients/1`

### Stopping the Application

* To stop all running services, press `Ctrl+C` in the terminal where `docker-compose up` is running.
* To stop and remove the containers:
    ```bash
    docker-compose down
    ```
* To stop, remove containers, AND remove the named volumes (this will **delete your database data and any uploaded files** stored in volumes!):
    ```bash
    docker-compose down -v
    ```

---
## Connecting to the Database with DataGrip 🐘

You can connect to the PostgreSQL database running inside its Docker container using a database client like DataGrip to inspect data or run queries directly.

1.  **Ensure Docker Containers are Running:** The `postgres_db` service, as defined in `docker-compose.yml`, must be active (i.e., `docker-compose up` should be running).
2.  **Connection Details:**
    * **Tool:** DataGrip (or any other SQL client that supports PostgreSQL)
    * **Database Type:** PostgreSQL
    * **Host:** `localhost` (The `postgres_db` service maps its internal port 5432 to port 5432 on your host machine)
    * **Port:** `5432` (The host port)
    * **User:** `demouser` (Defined by `POSTGRES_USER` in `docker-compose.yml`)
    * **Password:** `demopass` (Defined by `POSTGRES_PASSWORD` in `docker-compose.yml`)
    * **Database:** `insurance_clients_db` (Defined by `POSTGRES_DB` in `docker-compose.yml`)
3.  **Steps in DataGrip:**
    * Open DataGrip.
    * Go to `File > New > Data Source > PostgreSQL`.
    * A configuration window will appear. Fill in the **General** tab:
        * **Name:** Give your connection a descriptive name (e.g., "Insurance App Docker DB").
        * **Host:** `localhost`
        * **Port:** `5432`
        * **Authentication:** Select "User & Password".
        * **User:** `demouser`
        * **Password:** `demopass` (DataGrip will prompt you to enter and save it).
        * **Database:** `insurance_clients_db`
        * The JDBC URL will be auto-generated (e.g., `jdbc:postgresql://localhost:5432/insurance_clients_db`).
    * **Driver:** DataGrip usually bundles the PostgreSQL JDBC driver. If it indicates the driver is missing, there will be an option to download it.
    * Click the **Test Connection** button. If all details are correct and the `postgres_db` container is running, it should succeed.
    * If successful, click **Apply** and then **OK**.
    * Your new data source will appear in DataGrip's Database Explorer panel. You can expand it to see schemas (e.g., `public`), tables (e.g., `clients`), and run SQL queries.

---
## Technology Stack 💻

This project utilizes a modern technology stack for web development:

* **Frontend:**
    * **Next.js (v14+):** A popular React framework providing features like file-system routing (App Router), server components, client components, image optimization, and a great developer experience.
    * **React (v18+):** A JavaScript library for building dynamic and interactive user interfaces through a component-based architecture.
    * **TypeScript:** A statically typed superset of JavaScript that enhances code quality, readability, and maintainability by adding type safety.
* **Backend:**
    * **Spring Boot (v3.2+ with Java 17+):** A powerful framework for creating robust, stand-alone, production-grade Java applications with minimal configuration. Used here to build RESTful web services.
    * **Spring Data JDBC:** A part of the Spring Data family that simplifies database access using JDBC. It provides an abstraction layer over JDBC, reducing boilerplate code for common database operations through repository interfaces.
* **Database:**
    * **PostgreSQL (v15+):** A feature-rich, open-source object-relational database system known for its reliability and data integrity.
* **Development Environment & Orchestration:**
    * **Docker:** A platform for developing, deploying, and running applications in lightweight, isolated environments called containers.
    * **Docker Compose:** A tool for defining and managing multi-container Docker applications. It uses a YAML file (`docker-compose.yml`) to configure the application's services, networks, and persistent data volumes.

---
## Architecture and How It Works 🏗️

The application follows a typical client-server architecture, containerized for ease of development and deployment.

### Overview

* The **Frontend** (Next.js) runs in the browser and is responsible for the user interface and user interactions.
* The **Backend** (Spring Boot) provides a REST API that the frontend consumes to fetch and manipulate data.
* The **Database** (PostgreSQL) stores all persistent application data, such as client information.
* **Docker Compose** orchestrates these three services, managing their networking and lifecycles.

### Frontend Deep Dive (`frontend/`)

* **Routing & Pages (`app/` directory):** Next.js's App Router is used.
    * `app/layout.tsx`: The root layout component that defines the main HTML structure (`<html>`, `<body>`) for all pages.
    * `app/globals.css`: Contains global CSS styles applied across the application.
    * `app/clients/page.tsx`: This React component renders the UI for the `/clients` URL, which displays the list of clients. It's a Client Component (`"use client";`) because it fetches data dynamically using `useEffect` and `fetch`, manages local UI state with `useState`, and maps client data to `ClientListItem` components for display.
    * `app/clients/[clientId]/page.tsx`: This is a dynamic route that handles URLs like `/clients/1`, `/clients/2`, etc. It fetches detailed information for a specific client (identified by `[clientId]`) and renders the `ClientDetailView` and `ProfilePictureUploader` components.
* **Reusable UI Components (`components/` directory):**
    * `ClientListItem.tsx`: A presentational component responsible for displaying a summary of a single client in the list (name, profile picture thumbnail).
    * `ClientDetailView.tsx`: Displays all the detailed information (personal info, insurance details, full profile picture) for a selected client.
    * `ProfilePictureUploader.tsx`: Provides the user interface (file input, upload button) and logic for selecting an image file and initiating the upload process to the backend API.
* **Data Structures (`interfaces/client.ts`):**
    * Defines TypeScript interfaces like `Client` and `ClientSummary`. These interfaces specify the expected structure (shape) of client-related data, ensuring type safety when fetching, passing, and displaying data throughout the frontend application.
* **Static Assets (`public/` directory):**
    * Stores static files like images (e.g., `default-profile.png`) that are served directly by the Next.js development server or from the build output in production.
* **Configuration:**
    * `package.json`: Lists project dependencies (Next.js, React, etc.) and defines scripts for development, building, and linting (e.g., `npm run dev`).
    * `tsconfig.json`: Configures the TypeScript compiler, including settings for path aliases (e.g., allowing imports like `@/components/...`).

### Backend Deep Dive (`backend/`)

The backend follows a layered architecture common in Spring Boot applications: Controller -> Service -> Repository.

* **API Endpoints (`controller/ClientController.java`):**
    * This class is annotated with `@RestController`, indicating that it handles incoming HTTP requests and returns data directly in the response body (typically as JSON).
    * `@RequestMapping("/api/clients")` maps all requests starting with `/api/clients` to this controller.
    * Methods like `@GetMapping` and `@PostMapping` define handlers for specific HTTP methods and URL paths (e.g., `GET /api/clients` to fetch all clients, `POST /api/clients/{id}/profile-picture` to upload a picture).
    * Controllers receive requests, validate input (if necessary), delegate the core work to service classes, and then format and return the HTTP response.
* **Business Logic (`service/ClientService.java`):**
    * This layer contains the main business logic of the application.
    * It's responsible for operations like retrieving clients, updating client information, and coordinating file storage.
    * It interacts with the `ClientRepository` for database operations and the `FileStorageService` for handling file uploads.
    * For example, when updating a profile picture, it first asks `FileStorageService` to save the image and then updates the client's record in the database with the new image path.
* **File Handling (`service/FileStorageService.java`):**
    * Dedicated to managing the storage of uploaded files (profile pictures).
    * It takes an uploaded `MultipartFile`, generates a unique filename to avoid conflicts, and saves the file to a configured directory on the server's local filesystem (the path is specified by `file.upload-dir` in `application.properties`).
    * It returns the relative web-accessible path to the stored file, which is then saved in the client's database record.
* **Data Access (`repository/ClientRepository.java`):**
    * This is an interface that extends Spring Data JDBC's `CrudRepository<Client, Long>`.
    * By doing so, Spring Data automatically provides implementations for common database operations (Create, Read, Update, Delete) for the `Client` entity, significantly reducing the amount of boilerplate data access code you need to write.
* **Data Model/Entity (`model/Client.java`):**
    * A Plain Old Java Object (POJO) that represents a client.
    * Annotations like `@Table("clients")` and `@Id` map this class and its fields to the `clients` table and its primary key column in the PostgreSQL database.
* **Data Transfer Objects (`dto/ClientSummaryDto.java`):**
    * Simple objects used to transfer specific subsets of data between layers, particularly from the backend to the frontend.
    * For instance, `ClientSummaryDto` is used to send only essential information (ID, name, profile picture path) for the client list view, rather than the entire `Client` entity.
* **Configuration:**
    * `resources/application.properties`: Central configuration file for Spring Boot. It contains database connection details (URL, username, password), the server port, and custom application properties like `file.upload-dir`.
    * `config/WebConfig.java`: A Java configuration class. In this project, it's used to configure Spring Boot to serve static resources (the uploaded profile pictures) from the server's filesystem, making them accessible via a URL.
    * `resources/schema.sql`: An SQL script that Spring Boot executes on application startup (due to `spring.sql.init.mode=always`) to initialize the database schema by creating the `clients` table.

### How Frontend and Backend Interact

Communication happens primarily via REST API calls over HTTP:

1.  **Data Display (e.g., Client List):**
    * The Next.js frontend page (`app/clients/page.tsx`) uses the `fetch` API in a `useEffect` hook to send a `GET` request to the backend (e.g., `http://localhost:8080/api/clients`).
    * The Spring Boot `ClientController` receives this request, calls the `ClientService` to retrieve data from the PostgreSQL database (via `ClientRepository`).
    * The backend formats the data as JSON and sends it back in the HTTP response.
    * The frontend receives the JSON data, updates its React state, and re-renders the UI to display the client list.

2.  **Data Submission (e.g., Profile Picture Upload):**
    * The Next.js `ProfilePictureUploader` component creates a `FormData` object containing the selected image file.
    * It sends an HTTP `POST` request using `fetch` to the backend (e.g., `http://localhost:8080/api/clients/1/profile-picture`).
    * The Spring Boot `ClientController` receives the `MultipartFile`.
    * It calls `ClientService`, which uses `FileStorageService` to save the file to disk and then updates the client's `profilePicturePath` in the database via `ClientRepository`.
    * The backend responds (e.g., with the new image path or a success status).
    * The frontend updates the UI accordingly.

### Docker Container Interaction 🐳➡️📦➡️🗄️

Docker Compose creates a unified environment where all services can communicate easily.

* **Network:** Docker Compose automatically sets up a default private network. All services defined in `docker-compose.yml` (`next_frontend`, `spring_backend`, `postgres_db`) are connected to this network. Within this network, services can discover and communicate with each other using their **service names as hostnames**.
* **Frontend (`next_frontend`) to Backend (`spring_backend`):**
    * The Next.js frontend code, when running in the user's browser, makes API calls to an address like `http://localhost:8080/api/...`.
    * `localhost:8080` on your host machine is mapped by Docker (due to the `ports: - "8080:8080"` setting for the `spring_backend` service) to port 8080 of the `spring_backend` container.
    * So, requests from the browser go to your host machine's port 8080, which Docker then forwards to the Spring Boot application running inside the `spring_backend` container.
* **Backend (`spring_backend`) to Database (`postgres_db`):**
    * The Spring Boot application (running inside the `spring_backend` container) needs to connect to the PostgreSQL database (running inside the `postgres_db` container).
    * It does this using the JDBC URL specified in `application.properties`: `jdbc:postgresql://postgres_db:5432/insurance_clients_db`.
    * Here, `postgres_db` is the **service name** of the database container. Docker's internal DNS resolves this service name to the internal IP address of the `postgres_db` container on the private Docker network. Port `5432` is the port PostgreSQL listens on within its container. This communication happens entirely within the Docker network.
* **Data Persistence with Volumes:**
    * **Database (`postgres_data` volume):** The `postgres_db` service uses a named volume (`postgres_data:/var/lib/postgresql/data`) to store its data. This ensures that your database information persists even if the `postgres_db` container is stopped or removed.
    * **Uploads (`backend_uploads` volume):** The `spring_backend` service uses a named volume (`backend_uploads:/app/uploads`) to store uploaded profile pictures. This means files saved by Spring Boot to `/app/uploads/` inside its container are actually stored in this persistent Docker volume.

This architecture provides a clear separation of concerns, scalability, and a consistent development environment thanks to Docker.
# insurance-client-app-prototype
