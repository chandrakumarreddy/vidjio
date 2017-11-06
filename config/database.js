if (process.env.NODE_ENV === 'production') {
    module.exports = { mongoURI: 'mongodb://chandra:chandra@123@ds149495.mlab.com:49495/vidjio' }
} else {
    module.exports = { mongoURI: 'mongodb://localhost/vidjot-dev' }
}