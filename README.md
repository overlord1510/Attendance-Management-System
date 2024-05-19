# Attendance Management System

This repository contains a complete Attendance Management System developed using Spring Boot for the backend and Angular for the frontend.

## Project Structure

The repository is organized into two main folders:

1. **AMS_API_V10**: Contains the backend code written using Spring Boot.
2. **AMS_APP_V1**: Contains the frontend code written using Angular 15.

## Features

- **User Authentication and Authorization**: Secure login/logout functionality with role-based access control (Admin, Teacher, Student).
- **Attendance Management**: CRUD operations for managing attendance records.
- **OTP-based Password Recovery**: Recover passwords using OTP sent to registered email.
- **Dashboard**: Visual representation of attendance statistics.
- **Security**: JWT authentication with refresh token functionality.

## Technologies Used

### Backend

- Spring Boot
- Spring Data JPA
- Spring Security
- MySQL
- JWT

### Frontend

- Angular 15

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js and npm
- MySQL

### Backend Setup

1. **Navigate to the `AMS_API_V10` directory:**

   ```bash
   cd AMS_API_V10
   ```

2. **Create a MySQL database:**

   ```sql
   CREATE DATABASE ams;
   ```

3. **Update `application.properties` file with your database credentials:**

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ams
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

4. **Build and run the Spring Boot application:**

   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. **Navigate to the `AMS_APP_V1` directory:**

   ```bash
   cd AMS_APP_V1
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Run the Angular application:**

   ```bash
   ng serve
   ```

4. **Access the application at `http://localhost:4200`.**

## Usage

- **Admin**: Manage users, classes, and view attendance statistics.
- **Teacher**: Mark attendance.
- **Student**: View their own attendance records.

## Security

- JWT authentication is implemented to secure the backend APIs.
- Refresh token functionality is implemented to enhance security.
- OTP-based password recovery feature is available.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

## Contact

For any inquiries, please contact [mdasadali789@gmail.com].
