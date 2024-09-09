import { NextResponse } from "next/server";
import { db } from "@/db"; // Adjust this path based on your project structure
import { users } from "@/db/schema/users"; // Assuming the users table is in your schema
import bcrypt from "bcrypt"; // You'll need this to hash passwords

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.insert(users).values({
      name,
      email,
      passwordHash: hashedPassword, // Store the hashed password
    });

    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}
