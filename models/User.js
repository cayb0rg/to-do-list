var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    projects: [{type: Schema.Types.ObjectId, ref:'Project'}]
})

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;