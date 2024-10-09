import mongoose, { Mongoose } from'mongoose';

const testcaseSchema = new mongoose.Schema({
    input: { type: String, required: true },
    output: { type: String, required: true }
});

export const problemSchema = new mongoose.Schema({
    problemID: { type: String, required: true, unique: true },
    problemName: { type: String, required: true },
    problemStatement: { type: String, required: true },
    testcases: [testcaseSchema]  // Array of testcases
});
const contestSchema = new mongoose.Schema({
    contestId: { type: Number, required: true, unique: true },
    contestName: { type: String, required: true },
    contestProblems: [problemSchema]
});

export const Problem = mongoose.model('Problem', problemSchema);
export const Contest = mongoose.model('Contest',contestSchema);
