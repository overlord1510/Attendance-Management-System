# Attendance Management System

This repository contains a complete Attendance Management System developed using Spring Boot for the backend and Angular for the frontend.

## Project Structure

The repository is organized into two main folders:

1. **AMS_API_V10**: Contains the backend code written using Spring Boot.
2. **AMS_APP_V1**: Contains the frontend code written using Angular 15.

## Screenshots

Here are some screenshots of the application:

### Login Page
![Login](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/4083bf30-9fd6-4541-b9e5-ce609a093125)

### Admin DashBoard
![Admin DashBoard](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/19d0758c-8396-460a-9e47-89db6cd17d53)

### Course List
![CourseList](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/664110dc-192d-4935-8ec3-9446bb30ee38)

### Register Course
![Register Course](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/73b14660-ef3a-41d3-9f66-e1885e8d8fca)

### Department List
![DepartmentList](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/4e694270-67ec-49b2-b76f-0e961aeb5b10)

### Register Department
![RegisterDepartment](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/a4b7741b-4b83-451a-a18d-eb50d27e8563)

### Instructor List
![InstructorList](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/3ed8f949-a942-4e16-9842-6937befb5b73)

### Register Instructor
![RegisterInstructor](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/a8ff0678-521d-40fa-b675-19edaacfae20)

### Instructor's Details
![InstructorDetails](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/eab30635-5e34-483c-8c72-98c5bddc0baa)

### Assign Courses to Instructor
![AssignCourseToInstructor](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/5cfa92b7-6f3b-46df-8a76-77b218fff603)

### Assign Batches to Instructor
![AssignbatchToInstructor](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/abc8bb5e-0301-42b4-9208-33b36c8fc27b)

### Student List
![StudentList](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/5918b254-7d81-4004-9620-13098c218fa4)

### Register Student
![RegisterStudent](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/236a095c-7a93-4dd1-89d6-cfa09f1b7d38)

### Batch List
![BatchList](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/3e4d2f91-43d7-4439-914e-c44a9b76b3fc)

### Register Batch
![RegisterBatch](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/5f8c9b78-3338-43c2-ac0b-f712061d3f12)

### Promote Eligible Students
![PromoteStudents](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/be1e20b8-2a96-4121-ae5d-c73f573f8e3a)

### Recover Password
![RecoverPassword](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/b430cc71-4637-4a37-a0ac-6c34f444fbf7)

### Assigned Batches of Instructor
![AssignedBatches](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/fa0473b7-91a3-4de7-9602-a7ac350e9506)

### Attendance Marking
![AssignAttendance](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/5a38e29e-ac91-4ec3-bf3f-217a96d5c996)

### Students view
![StudentsAttendance](https://github.com/overlord1510/Attendance-Management-System/assets/58284179/d4140e11-edcc-44b2-bf8a-604638b0b33c)


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
