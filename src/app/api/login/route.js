// src/app/api/login/route.js
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: 'Username and password are required' },
      { status: 400 }
    );
  }

  try {
    // Create MySQL connection
    const db = await mysql.createConnection({
      host: 'localhost', // Adjust according to your MySQL setup
      user: 'root', // Replace with your MySQL username
      password: '', // Replace with your MySQL password
      database: 'pikmeorg', // Your database name
    });

    // Query to check if user exists
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const user = rows[0];

    // You can compare the password here with bcrypt if you hashed passwords
    if (password === user.password) {
      // Successfully authenticated, return success response
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
