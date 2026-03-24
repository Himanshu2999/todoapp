const exp = require("express")
const cont = require("./controls")
const rout = exp.Router();

rout.post("/addtask", cont.addtask )
rout.put("/complete/:idk", cont.complete)
rout.get("/getask", cont.getasks)
rout.delete('/rmv/:idk', cont.rmv)
rout.put("/editask/:idk", cont.editask)

module.exports = rout;