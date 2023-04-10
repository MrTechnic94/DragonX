const db = require("mongoose");

const Schema = db.Schema({
    User: String
});

module.exports = db.model("User", Schema);