const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            max: 40,
            min: 1,
            required: true,
        },
        completed: {
            type: Number,
            default: 0,
        },
        important: {
            type: Boolean,
            default: false,
        },
        due_date:{
            type:Date,
        }
    },
    { timestamps: true }
);

module.exports.schema = itemSchema;
module.exports.model = mongoose.model("Item", itemSchema);
