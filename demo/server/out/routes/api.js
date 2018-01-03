"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var api = express_1.Router();
/**
 * GET JSON Object
 */
api.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    var fileName = './server/locale/' + req.query.filename;
    readJSONFile(fileName, function (err, json) {
        if (err) {
            throw err;
        }
        res.status(200).send(json);
    });
});
var fs = require('fs');
function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        try {
            callback(null, JSON.parse(data));
        }
        catch (exception) {
            callback(exception);
        }
    });
}
exports.default = api;
//# sourceMappingURL=api.js.map