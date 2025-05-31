# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml to leverage Docker cache
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies (if you want to build inside Docker, otherwise copy pre-built jar)
# RUN ./mvnw dependency:go-offline -B

# Copy the rest of the application code
COPY src ./src

# Package the application (if building inside Docker)
RUN ./mvnw package -DskipTests

# The application's JAR file
ARG JAR_FILE=target/*.jar

# Copy the JAR file into the container
# This assumes you build the jar locally first and then build the docker image.
# For a more integrated build, you would use a multi-stage Dockerfile or build inside.
# For simplicity for a beginner, let's assume the JAR is built before `docker-compose up`.
# If you prefer to build inside docker with `RUN ./mvnw package`,
# then you'd copy from the build stage or directly reference the built jar path.

# For this example, we'll copy the jar built by `mvn package` (run this before `docker-compose build`)
COPY ${JAR_FILE} application.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java","-jar","/app/application.jar"]