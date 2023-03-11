require('dotenv-safe').config();

module.exports = {
    uri: process.env.DATABASE_URL,
}