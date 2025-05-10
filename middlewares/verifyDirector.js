const verifyDirector = (req, res, next) => {
    const directorId = req.header("director-id");
    if (!directorId) {
        return res.status(400).json({ error: "🎬 ფილმის შექმნა შეუძლებელია, რადგან რეჟისორის ID არ არის წარმოდგენილი ჰედერში!" });
    }
    next();
};

module.exports = verifyDirector;
