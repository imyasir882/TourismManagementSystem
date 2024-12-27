const Visitor = require('../models/Visitor');
const Review = require('../models/Review');

exports.createVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.create(req.body);
        res.status(201).json({ success: true, data: visitor });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getVisitorActivity = async (req, res) => {
    try {
        const visitorActivity = await Review.aggregate([
            {
                $group: {
                    _id: '$visitor',
                    reviewCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'visitors',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'visitorInfo'
                }
            }
        ]);
        res.status(200).json({ success: true, data: visitorActivity });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// Add these to the existing visitorController.js

exports.getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json({
            success: true,
            count: visitors.length,
            data: visitors
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id)
            .populate('visitedAttractions');
        if (!visitor) {
            return res.status(404).json({
                success: false,
                error: 'Visitor not found'
            });
        }
        res.status(200).json({
            success: true,
            data: visitor
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!visitor) {
            return res.status(404).json({
                success: false,
                error: 'Visitor not found'
            });
        }
        res.status(200).json({
            success: true,
            data: visitor
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.addVisitedAttraction = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({
                success: false,
                error: 'Visitor not found'
            });
        }

        const { attractionId } = req.body;
        if (!visitor.visitedAttractions.includes(attractionId)) {
            visitor.visitedAttractions.push(attractionId);
            await visitor.save();
        }

        res.status(200).json({
            success: true,
            data: visitor
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
