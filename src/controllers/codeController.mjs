import {Webtoon} from '../models/problem.mjs';

import { authenticateJWT } from '../middleware/auth.mjs'; // Adjust the path accordingly

// Create a new webtoon (POST) with JWT protection
export const createWebtoon = [
    authenticateJWT, // Protect the route with JWT middleware
    async (req, res) => {
        const { id, title, description, characters } = req.body;
        try {
            const webtoon = new Webtoon({ id, title, description, characters });
            await webtoon.save();
            res.status(201).json(webtoon);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
];

// Delete a specific webtoon by ID (DELETE) with JWT protection
export const deleteWebtoon = [
    authenticateJWT, // Protect the route with JWT middleware
    async (req, res) => {
        const { id } = req.params;
        try {
            const webtoon = await Webtoon.findOneAndDelete({ id });
            if (!webtoon) {
                return res.status(404).json({ error: 'Webtoon not found' });
            }
            res.json({ message: 'Webtoon deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];


// Get all webtoons (GET)
export const getAllWebtoons = async (req, res) => {
    try {
        const allWebtoons = await Webtoon.find();
        res.json(allWebtoons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get a specific webtoon by ID (GET)
export const getWebtoon = async (req, res) => {
    const { id } = req.params;
    try {
        const webtoon = await Webtoon.findOne({ id });
        if (!webtoon) {
            return res.status(404).json({ error: 'Webtoon not found' });
        }
        res.json(webtoon);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const testEndpoint = (req, res) => {
    res.send('hey working');
};
