exports.verify_X_API_KEY = async (req, res, next) =>{
    try {
        const x_api_key = req.headers['x-api-key'];
        if(!x_api_key || x_api_key !== X_API_KEY){
            const error = new AppError("Forbibben", 403)
            return res.status(error.statusCode).json(error.toJSON());
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized to access this Route' })
    }
}



