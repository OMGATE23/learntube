const mongoose = require('mongoose')

const connectToDB = () => {
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(console.log('CONNECTED TO DB eduhackauth')).catch((err) => {
        console.log(err.message)
        console.log('UNABLE TO CONNECT TO DB')
        process.exit(1)
    })
}

module.exports = connectToDB