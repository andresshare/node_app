var mongoose = require("mongoose")
var Schema = mongoose.Schema

mongoose.connect("mongodb://localhost/photos")


var posibles_valores = [
    "M",
    "F"
]

var email_match = [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Correo no valido intenta de nuevo"]

var password_validation = {
    validator: function (p) {
        return this.password_confirmation == p
    },

    message: "password incorrect "
}



var user_schema = new Schema({
    name: String,
    last_name: { type: String, required: true, maxlength: [50, "username  not valid "], },
    password: {
        type: String,
        minlength: [8, "El password is short"],
        validate: password_validation
    },
    age: {type: Number, min: [17, "age < 17"], max: [75, "age >  75"] },
    email: { type: String, require: " error email ", match: email_match },
    date_of_birth: Date,
    sex: { type: String, enum: { values: posibles_valores, message: "option no valid" } }
})

user_schema.virtual("password_confirmation").get(function () {
    return this.p_c
}).set(function (password) {
    this.p_c = password
})



var User = mongoose.model("User", user_schema)

module.exports.User = User




