var express = require("express")
var app = express()
var User = require("./models/user").User
var bodyParser = require("body-parser")

app.use(express.static('public'));


app.use(bodyParser.json())//peticiones application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "pug")

app.get("/",function (req,res) {
    res.render("index")
})

app.get("/login",function (req,res) {
    User.find(function (err,doc) {
        console.log(doc);
        res.render("login")
    })

})


app.post("/users",function (req,res) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    })

    console.log(user.password_confirmation);

    user.save(function(err,user,numero) {
    if (err) {
        console.log(String(err))
    }
        res.send("Datos recibidos")
})


})
app.listen(3000)
