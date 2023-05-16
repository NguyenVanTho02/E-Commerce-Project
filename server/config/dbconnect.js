const {default: mongoose} = require('mongoose')

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_IRL)
        if(conn.connection.readyState === 1) {
            console.log('DB connection is successfully');
        } else {
            console.log('DB connection is failed');
        }
    } catch(err) {
        console.log('DB connection is failed');
        throw new Error(err)
    }
}

module.exports = dbConnect