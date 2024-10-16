import dbConnect from "@/lib/DbConnection/connection";
import Document from "@/lib/models/Document";
import { NextResponse } from "next/server"; // Use NextResponse for handling responses

// POST method to handle creating a document
export async function POST(req) {
  await dbConnect(); // Ensure DB connection

  try {
    const { fileName, type, content, createdBy } = await req.json(); // Parse request body

    // Validate the document name
    if (!fileName) {
      return NextResponse.json(
        { success: false, error: "Please specify document name" },
        { status: 400 }
      );
    }

    // Validate the document type
    if (!["text", "spreadsheet", "pdf"].includes(type)) {
      return NextResponse.json(
        { success: false, error: "Invalid document type" },
        { status: 400 }
      );
    }

    // Create a new document
    const newDocument = new Document({
      fileName,
      type,
      content,
      createdBy, // Make sure this is a valid ObjectId referencing a User
    });

    // Save the document to the database
    const savedDocument = await newDocument.save();

    // Populate the 'createdBy' field with only the 'name', 'email', and 'image' fields
    const populatedDocument = await Document.findById(
      savedDocument._id
    ).populate("createdBy", "name email image"); // Only select the name, email, and image fields

    // Return a success response with the document and user data
    return NextResponse.json(
      { success: true, document: populatedDocument },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
