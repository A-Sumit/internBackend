import mongoose, { Mongoose } from'mongoose';
const contestScoreSchema = new mongoose.Schema({
    contestId: { type: Number, required: true },
    score: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    contests: [contestScoreSchema]
});

export const UserModel = mongoose.model('User', userSchema);
// export default User;