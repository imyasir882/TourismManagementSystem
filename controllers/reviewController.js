const Review = require('../models/Review');
const Visitor = require('../models/Visitor');
const { updateAttractionRating } = require('./attractionController');

exports.createReview = async (req, res) => {
    try {
        const { attractionId, visitorId, score, comment } = req.body;

        // Check if visitor has visited the attraction
        const visitor = await Visitor.findById(visitorId);
        if (!visitor.visitedAttractions.includes(attractionId)) {
            return res.status(400).json({
                success: false,
                error: 'Visitor must visit the attraction before reviewing'
            });
        }

        // Create review
        const review = await Review.create({
            attraction: attractionId,
            visitor: visitorId,
            score,
            comment
        });

        // Update attraction rating
        await updateAttractionRating(attractionId);

        res.status(201).json({ success: true, data: review });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
