var express = require("express")
var app = express()
var User = require("./models/user").User
var bodyParser = require("body-parser")
var session= require("express-session")
var router_app = require("./routes_app")
var session_middleware = require("./middlewares/session")


app.use("/public",express.static('public'));


app.use(bodyParser.json())//peticiones application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: "123dfgdsfgs234234sdfs",
    resave: false,
    saveUninitialized: false

}))

// 

app.set("view engine", "pug")

app.get("/",function (req,res) {
    console.log(req.session.user_id);

    res.render("index")
})

app.get("/signup",function (req,res) {
    User.find(function (err,doc) {
        console.log(doc);
        res.render("signup")
    })

})

app.get("/login", function (req, res) {
    User.find(function (err, doc) {
        res.render("login")
    })

})



app.post("/sessions",function (req,res) {

    User.findOne({email:req.body.email ,password:req.body.password},"username email",function (err,user) {
        console.log(docs);
        req.session.user_id = user._id
        res.send("text")
    })

    app.use("/app",session_middlewares)
    app.use("/app", routes_app)
})
app.listen(3000)
