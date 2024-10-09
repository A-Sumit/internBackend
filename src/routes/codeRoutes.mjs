import express from 'express';
import { addUser,getLeaderBoard,contestSubmit,submit,getProblem,getAllProblem,setProblem,executeCode, testEndpoint ,createContest, getAllContest, getContest} from '../controllers/codeController.mjs';

const router = express.Router();

router.get('/test', testEndpoint);
router.post('/run', executeCode);
router.post('/setproblem', setProblem);
router.post('/adduser', addUser);
router.post('/problem/submit/:problemID', submit);
router.get('/problem', getAllProblem);
router.get('/problem/:problemID', getProblem);
router.post('/create-contest',createContest);
router.get('/contests',getAllContest);
router.get('/contest/:id',getContest);
router.post('/contests/:contestId/problems/:problemID/submit',contestSubmit);
router.get('/leaderboard/:contestId',getLeaderBoard);

export default router;
