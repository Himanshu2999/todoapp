const model = require("./model")
const mg = require("mongoose");

exports.addtask = async(req,res)=>{
     const data = new model.taskmodel({Task: req.body.task, Status: "pending"})
     const sv = await data.save();
     if(sv){
        res.status(200).json({statuscode: 1})
     }
     else{
        res.status(500).json({statuscode: 0})
     }
}

exports.complete = async(req,res)=>{
     const data = await model.taskmodel.updateOne({_id: req.params.idk}, { $set: {Status: "completed"}})
     if(data.modifiedCount==1){
        res.status(200).json({statuscode: 1})
     }
     else{
        res.status(500).json({statuscode: 0})
     }
}

exports.editask = async(req,res)=>{
     const data = await model.taskmodel.updateOne({_id: req.params.idk}, { $set: {Task: req.body.editask}})
     if(data.modifiedCount==1){
        res.status(200).json({statuscode: 1})
     }
     else{
        res.status(500).json({statuscode: 0})
     }
}

exports.rmv = async(req,res)=>{
     const data = await model.taskmodel.deleteOne({_id: req.params.idk})
     if(data.deletedCount==1){
        res.status(200).json({statuscode: 1})
     }
     else{
        res.status(500).json({statuscode: 0})
     }
}

exports.getasks = async(req,res)=>{
     const data = await model.taskmodel.find();
     if(data!=null){
        res.status(200).json({statuscode: 1, dt: data})
     }
     else{
        res.status(500).json({statuscode: 0})
     }
}

