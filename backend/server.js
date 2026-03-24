const exp = require("express");
const mg = require("mongoose");
const cors = require("cors");
const usroute = require("./routes")
const app = exp();


app.use(exp.urlencoded({extended: false}))
app.use(exp.json())

mg.connect('mongodb://127.0.0.1:27017/todoweb').then(()=>console.log("Connected to mongodb"))

mg.set("strictQuery", false)

app.use(cors({origin: "http://localhost:3000"}))

app.use("/api", usroute);

const PORT = process.env.PORT || 9000;

app.get("/", (req,res)=>{
    res.send("welcome to website")
})

app.listen(PORT, (req,res)=>{
    console.log("server is running")
})