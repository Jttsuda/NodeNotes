const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Enter a Username'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Enter a Password'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


// Hashing Password
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static Method to Login User
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
    }
}


const User = mongoose.model('user', userSchema);
module.exports = User;
