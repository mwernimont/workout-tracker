const validId = (req, res, next) => {
    if (isNaN(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Invalid workout ID' });
    }
    next();
}

module.exports = validId
