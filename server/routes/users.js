const router = require("express").Router()
const {User} = require("../models")

router.get("/", async(req,res,next)=>{
    try {
        const allUsers = await User.findAll();
        res.json(allUsers);
        
    } catch (error) {
        next(error)
    }
})

router.get("/:username/:password", async(req,res,next)=>{
    try {
        const singleUser = await User.findOne({
            where:{
                username: req.params.username,
                password: req.params.password
            }
        });
        if(singleUser){
            res.json(singleUser)
        }else{
            res.status(404).json('User not found');
        }
         
    } catch (error) {
        next(error)
    }
})

router.get("/:username", async(req,res,next)=>{
    try {
        const verifyUser = await User.findOne({
            where: {
                username : req.params.username
            }
        })
        if(verifyUser){
            res.json(true)
        }else{
            res.json(false)
        }
        
    } catch (error) {
        next(err)
    }
})

router.post("/",async(req,res,next)=>{
    try {
        const newUser = await User.create(req.body);
        res.json(newUser)
        
    } catch (error) {
        next(error)
    }
})

router.put("/:id", async(req,res,next)=>{
    try {
        const updatedUser = await User.findByPk(req.params.id);
        await updatedUser.update(req.body);
        res.json(updatedUser)
        
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async(req,res,next)=>{
    try {
        const deletedUser = await User.findByPk(req.params.id);
        await deletedUser.destroy();
        res.json("Deleted User")
        
    } catch (error) {
        next(error)
    }
})



module.exports = router;