if (process.env.Node_ENV == 'production') {
    module.exports = {
        mongouri: ' mongodb: /chandra:chandra@123@ds227525.mlab.com:27525/newsletter'
    }
} else {
    module.exports = {
        mongouri: 'mongodb://localhost/vidjio'
    }
}