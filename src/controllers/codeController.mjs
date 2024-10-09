import { cpp } from 'compile-run';
import {executeCppCode} from '../services/codeService.mjs';
import {Problem,Contest} from '../models/problem.mjs';
import { Submission } from '../models/submission.mjs';
import {UserModel} from '../models/userModel.mjs';
export const setProblem = async (req, res) => {
    const { problemID, problemName,problemStatement, testcases } = req.body;
    try {
        const newProblem = new Problem({ problemID,problemName,problemStatement, testcases });
        await newProblem.save();
        res.status(201).json({ message: 'Problem added successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const submit = async (req, res) => {
    const { problemID } = req.params; // Get the problemID from the URL
    const { code } = req.body;
    try {
        // Fetch the problem and its test cases from the database
        const problem = await Problem.findOne({ problemID });
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        const { testcases } = problem;
        // console.log(testcases);
        let allTestsPassed = true;
        console.log(testcases);
        
        // Iterate over each test case
        for (const testcase of testcases) {
            const { input, output: expectedOutput } = testcase;
        
            // Debugging: Log the test case input and expected output
            console.log('Running test case with input:', input);
            console.log('Expected output:', expectedOutput);
        
            try {
                // Call the external function to run the code with the current input
                const response = await coderunner(false, code, input);
        
                // Handle case where the code runner returns an error code
                if (response === -1) {
                    console.log('Error: Code runner returned -1 (Empty code)');
                    return res.json({ result: 'Empty code' });
                }
        
                // Debugging: Log the response from the code runner
                console.log('Code runner response:', response);
                const actualOutput = response.result.stdout;
                const stderr = response.result.stderr;
                // const actualOutput="5";
        
                // Compare the actual output with the expected output
                if (stderr) {
                    console.log('Error: stderr is not empty:', stderr);
                    allTestsPassed = false;
                    break;
                }
        
                if (actualOutput.trim() !== expectedOutput.trim()) {
                    console.log('Test failed: actual output does not match expected output');
                    allTestsPassed = false;
                    break;
                }
            } catch (error) {
                console.error('Error during code execution:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
        }

        // Return the result based on whether all tests passed
        if (allTestsPassed) {
            return res.json({ result: 'Accepted' });
        } else {
            return res.json({ result: 'Failed' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getProblem = async (req, res) => {
    const { problemID } = req.params; // Extract problemID from URL parameters

    try {
        // Fetch the problem from the database
        const problem = await Problem.findOne({ problemID });

        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        // Return the problem details
        return res.json(problem);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

};

export const getAllProblem = async (req, res) => {
    try {
        const problems = await Problem.find({});
        res.json(problems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const executeCode = async (req, res) => {
    const { filePath, sourceCode, input } = req.body;

    if (!filePath && !sourceCode) {
        return res.status(400).json({ error: 'Either filePath or sourceCode is required' });
    }

    try {
        const result = await executeCppCode(filePath, sourceCode, input);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const coderunner = async (filepath,sourceCode, input) => {
    if (!sourceCode) {
        return -1;
    }
    try {
        const result = await executeCppCode(filepath, sourceCode, input);
        return result;
    } catch (err) {
        return err;
    }
};

export const createContest = async (req,res) =>{
    const { contestId, contestName, contestProblems } = req.body;
    try {
        const contest = new Contest({ contestId, contestName, contestProblems });
        await contest.save();
        res.status(201).json(contest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getAllContest = async(req,res) =>{
    try{
        const all_contest = await Contest.find();
        res.json(all_contest);
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}

export const getContest = async (req, res) => {
    const { id } = req.params;
    try {
        const contest = await Contest.findOne({ contestId: id });
        if (!contest) {
            return res.status(404).json({ error: 'Contest not found' });
        }
        res.json(contest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const contestSubmit = async  (req, res) => {
    const { contestId, problemID } = req.params;
    const { userId, code } = req.body;
    try {
        const contest = await Contest.findOne({ contestId });
        if (!contest) {
            return res.status(404).json({ error: 'Contest not found' });
        }

        const problem = contest.contestProblems.find(p => p.problemID === problemID);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        let isCorrect = true;
        let totalScore = 0;
        for (const testcase of problem.testcases) {
            const { input, output: expectedOutput } = testcase;
            try {
                // Call the external function to run the code with the current input
                const response = await coderunner(false, code, input);
                // Handle case where the code runner returns an error code
                if (response === -1) {
                    console.log('Error: Code runner returned -1 (Empty code)');
                    return res.json({ result: 'Empty code' });
                }
        
                // Debugging: Log the response from the code runner
                console.log('Code runner response:', response);
                const actualOutput = response.result.stdout;
                const stderr = response.result.stderr;
                // const actualOutput="5";
        
                // Compare the actual output with the expected output
                if (stderr) {
                    console.log('Error: stderr is not empty:', stderr);
                    allTestsPassed = false;
                    break;
                }
        
                if (actualOutput.trim() !== expectedOutput.trim()) {
                    console.log('Test failed: actual output does not match expected output');
                    isCorrect = false;
                    break;
                }
                totalScore += 10;
            } catch (error) {
                console.error('Error during code execution:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
            const submission = new Submission({
                userId,
                contestId,
                problemID,
                code,
                isCorrect,
                score: isCorrect ? totalScore : 0
            });
    
            await submission.save();
    
            if (isCorrect) {
                const user = await UserModel.findOne({ userId });
                if (user) {
                    const contestIndex = user.contests.findIndex(c => c.contestId === contestId);
                    if (contestIndex >= 0) {
                        user.contests[contestIndex].score += totalScore;
                    } else {
                        user.contests.push({ contestId, score: totalScore });
                    }
                    await user.save();
                } else {
                    return res.status(404).json({ error: 'User not found' });
                }
            }
    
            res.json(submission);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getLeaderBoard= async (req, res) => {
    const { contestId } = req.params;
    try {
        const users = await UserModel.find({ 'contests.contestId': contestId });

        const leaderboard = users
            .map(user => {
                const contest = user.contests.find(c => c.contestId == contestId);
                return {
                    userId: user.userId,
                    username: user.username,
                    score: contest.score
                };
            })
            .sort((a, b) => b.score - a.score);

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addUser =async (req,res)=>{
    const { userId, username,contests } = req.body;
    try {
        const newUser = new UserModel({ userId, username,contests });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const testEndpoint = (req, res) => {
    res.send('hey working');
};
