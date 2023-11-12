const users = require("../Models/userSchema")
// register

exports.register = async (req, res) => {
    console.log('Inside register controller function');
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