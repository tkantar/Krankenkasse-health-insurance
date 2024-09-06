# Krankenkasse-health-insurance

Prerequisites<br/>
Before running the project, make sure you have the following prerequisites installed on your system:<br/>

Java 11 or higher<br/>
Maven for dependency management in the backend<br/>
Node.js (with npm or Yarn) for dependency management in the frontend<br/>
PostgreSQL as the database<br/>

Setup Instructions<br/>
Backend Setup (Spring Boot)<br/>
Clone the repository:<br/>
git clone https://github.com/tkantar/krankenkasse.git<br/>

Navigate to the backend directory:<br/>
cd customer_management/backend<br/>

Set up the PostgreSQL database: Create a new database in PostgreSQL. Take note of the database name, username, and password.<br/>

Configure application.properties: Go to src/main/resources/application.properties and update the following database configuration values:<br/>

spring.datasource.url=jdbc:postgresql://localhost:5432/your_database<br/>
spring.datasource.username=your_username<br/>
spring.datasource.password=your_password<br/>
spring.jpa.hibernate.ddl-auto=update<br/>

Run the backend: Use Maven to start the backend.<br/>

Frontend Setup (React)<br/>

Navigate to the frontend directory<br/>

cd ../frontend<br/>
Install dependencies:<br/>

Run the following command to install the required npm modules:<br/>

npm install<br/>
or if you're using Yarn: yarn install<br/>

Run the frontend:<br/>

Start the React application:<br/>

npm start<br/>
or if you're using Yarn: yarn start<br/>

Access the application: Open your browser and go to http://localhost:3000 to view the application.<br>

Login with boss@gmail.com and password "Passw0rd#_".
