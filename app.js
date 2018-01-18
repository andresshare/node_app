var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var Schema= mongoose.Schema

mongoose.connect("mongodb://localhost/photos")

var userSchemaJSON = {
    email: String,
    password: String,
}

var user_schema = new Schema(userSchemaJSON)
var User = mongoose.model("User", user_schema)



app.use(express.static('public'));

app.use(bodyParser.json())//peticiones application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "pug")

app.get("/",function (req,res) {
    res.render("index")
})

app.get("/login",function (req,res) {
    User.find(function name(err,doc) {
        console.log(doc);
        res.render("login")
    })

})


app.post("/users",function (req,res) {
var user = new User({email:req.body.email,password: req.body.password})
user.save(function () {
    res.send("Datos recibidos")
})
})
app.listen(3000)
