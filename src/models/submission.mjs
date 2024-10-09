import mongoose, { Mongoose } from'mongoose';
const submissionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    contestId: { type: Number, required: true },
    problemID: { type: String, required: true },
    code: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    score: { type: Number, required: true }
});
export const Submission = mongoose.model('Submission',submissionSchema);