const Attraction = require('../models/Attraction');
const Review = require('../models/Review');

exports.createAttraction = async (req, res) => {
    try {
        const attraction = await Attraction.create(req.body);
        res.status(201).json({ success: true, data: attraction });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getTopRatedAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find()
            .sort({ rating: -1 })
            .limit(5);
        res.status(200).json({ success: true, data: attractions });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update attraction rating
exports.updateAttractionRating = async (attractionId) => {
    try {
        const reviews = await Review.find({ attraction: attractionId });
        if (reviews.length === 0) return;

        const averageRating = reviews.reduce((acc, review) => acc + review.score, 0) / reviews.length;
        
        await Attraction.findByIdAndUpdate(attractionId, {
            rating: Number(averageRating.toFixed(1))
        });
    } catch (error) {
        console.error('Error updating attraction rating:', error);
    }
};

// Add these to the existing attractionController.js

exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json({
            success: true,
            count: attractions.length,
            data: attractions
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.getAttractionById = async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) {
            return res.status(404).json({
                success: false,
                error: 'Attraction not found'
            });
        }
        res.status(200).json({
            success: true,
            data: attraction
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateAttraction = async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!attraction) {
            return res.status(404).json({
                success: false,
                error: 'Attraction not found'
            });
        }
        res.status(200).json({
            success: true,
            data: attraction
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.deleteAttraction = async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!attraction) {
            return res.status(404).json({
                success: false,
                error: 'Attraction not found'
            });
        }
        res.status(200).json({
            success: true,
            
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
