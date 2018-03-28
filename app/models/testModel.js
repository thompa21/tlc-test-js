var observableArray = require("data/observable-array");
var testModel = new observableArray.ObservableArray();
testModel.Numbers = [
    {"Title": "One"},
    {"Title": "Two"},
    {"Title": "Three"}
];
module.exports = testModel;
