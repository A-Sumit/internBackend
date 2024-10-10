import express from 'express';
import {testEndpoint , createWebtoon, getWebtoon, getAllWebtoons, deleteWebtoon} from '../controllers/codeController.mjs';

const router = express.Router();

router.get('/test', testEndpoint);
router.post('/create-webtoon',createWebtoon);
router.get('/webtoon',getAllWebtoons);
router.get('/webtoon/:id',getWebtoon);
router.delete('/remove-webtoon',deleteWebtoon);

export default router;
