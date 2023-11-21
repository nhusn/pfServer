const jwt = require('jsonwebtoken')

const jwtMiddleware =(req,res,next)=>{
    console.log('Inside jwtMidlleware');
    const token = req.headers['authorization'].split(" ")[1]
    try{
        const jwtResponse = jwt.verify(token,"Amanushika_shakthi5367")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    }catch{
        res.status(401).json("Authorization failed!!! please login")
    }

}
module.exports = jwtMiddleware