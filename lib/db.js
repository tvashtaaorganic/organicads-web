import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost', // Change this if using a remote database
    user: 'root',      // Update with your MySQL username
    password: '',      // Update with your MySQL password
    database: 'pikmeorg' // Update with your database name
});

export default db;
