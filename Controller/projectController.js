const projects = require("../Models/projectSchema");
const { findByIdAndUpdate } = require("../Models/userSchema");

exports.addprojects = async (req, res) => {
    console.log("inside add project function");
    const { title, languages, overview, github, website } = req.body
    const projectImage = req.file.filename
    // console.log(`${title},${languages},${overview},${github},${website},${projectImage}`);
    const userId = req.payload
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project already exist upload another")
        } else {
            const newProject = new projects({
                title, languages, overview, github, website, userId, projectImage
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json(`Request failed, Error: ${err}`)
    }
}

exports.allUserProjects = async (req, res) => {
    try {
        const userId = req.payload
        const userProjects = await projects.find({ userId })
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.getAllProjects = async (req, res) => {
    const searchKey = req.query.search
    const query = {
        languages: { $regex: searchKey, $options: 'i' }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}
exports.getHomeProjects = async (req, res) => {
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.editProjectController = async (req, res) => {
    const {id} = req.params
    const userId = req.payload
    const { title,languages,overview, github, website, projectImage } = req.body
    const updateProjectImage = req.file?req.file.filename:projectImage

    try {
        const updateProject = await projects.findByIdAndUpdate({ _id:id },{
            title,languages,overview,github,website,userId,projectImage:updateProjectImage
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch (err) {
        res.status(401).json(`Request failed, Error: ${err}`)
    }
}

exports.deleteProjectController = async (req,res)=>{
    // get project details
    const {id}=req.params
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(err)
    }
}