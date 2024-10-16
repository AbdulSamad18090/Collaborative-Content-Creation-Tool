import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'spreadsheet', 'pdf'], // Define enum for type
    required: true,
  },
  content: {
    type: String, // Stores the HTML content or file content
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Avoid recompiling model in development mode
module.exports = mongoose.models.Document || mongoose.model('Document', DocumentSchema);
