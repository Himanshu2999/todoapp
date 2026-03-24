const { type } = require("@testing-library/user-event/dist/type");
const mg = require("mongoose");

const taskschema = new mg.Schema({"Task": {type: String}, Status: {type: String}}, {versionKey: false})

const sitemodl = {
    taskmodel : mg.model("task", taskschema )
}

module.exports = sitemodl;