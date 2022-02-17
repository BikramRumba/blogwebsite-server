const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');

// UPDATE
router.put('/:id', async(req, res) => {

    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true});
                res.status(200).json(updatedUser);
        }catch(error){
            res.status(400).json(error)
        }
    } else{
        res.status(401).json("you can update only your account!")
    }
});

// DELETE
router.delete('/:id', async(req, res) => {

    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true});
                res.status(200).json(updatedUser);
        }catch(error){
            res.status(400).json(error)
        }
    } else{
        res.status(401).json("you can delete only your account!")
    }
});

module.exports = router;