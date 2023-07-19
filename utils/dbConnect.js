const dbURL = require("../config/DB.config")
const {mongoose} = require("mongoose")

module.exports = async () => {
    try {
        await mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Connected to MongoDB')
    }catch (e) {
        console.error('Error connection to MongoDB:', e)
    }
}