import mongoose from 'mongoose';

// Schema for characters in the webtoon
const characterSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Unique ID for the character
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g., protagonist, antagonist, etc.
    description: { type: String, required: true } // Description of the character
});

// Schema for webtoon
export const webtoonSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Unique ID for the webtoon
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    characters: [characterSchema] // Array of characters
});

// Create the model
export const Webtoon = mongoose.model('Webtoon', webtoonSchema);
