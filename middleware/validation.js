const validateAttraction = (req, res, next) => {
    const { name, location, entryFee } = req.body;
    
    if (!name || !location || entryFee === undefined) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all required fields'
        });
    }

    if (entryFee < 0) {
        return res.status(400).json({
            success: false,
            error: 'Entry fee cannot be negative'
        });
    }

    next();
};

const validateVisitor = (req, res, next) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all required fields'
        });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid email address'
        });
    }

    next();
};

const validateReview = (req, res, next) => {
    const { attractionId, visitorId, score } = req.body;
    
    if (!attractionId || !visitorId || !score) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all required fields'
        });
    }

    if (score < 1 || score > 5) {
        return res.status(400).json({
            success: false,
            error: 'Score must be between 1 and 5'
        });
    }

    next();
};

module.exports = {
    validateAttraction,
    validateVisitor,
    validateReview
};
