const users = require("../Models/userSchema")
const jwt = require('jsonwebtoken')
// register

exports.register = async (req, res) => {
    const { username,password,email } = req.body
    // console.log(`${username}, ${password}, ${email}`);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Account already exist")
        } else {
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json(`Register API Failed:${err}`)
    }
}

// login
exports.login = async (req,res)=>{
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"Amanushika_shakthi5367")
            res.status(200).json({
                existingUser,token
            })
        }else{
            res.status(404).json("email or Password is incorrect")
        }
    }catch (err) {
        res.status(401).json(`Login API Failed:${err}`)
    }
}