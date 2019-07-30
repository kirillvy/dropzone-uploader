"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var doUpload = function (file) {
    var data = new FormData();
    data.append('inputname', file);
};
var onDrop = function (ev) {
    ev.preventDefault();
    var items = ev.dataTransfer.items;
    if (items && items.length > 0 && ev.dataTransfer.items[0].kind === 'file') {
        if (ev.dataTransfer.items[0].kind === 'file') {
            var file = ev.dataTransfer.items[0].getAsFile();
            if (file !== null) {
                doUpload(file);
            }
        }
    }
    else {
        var files = ev.dataTransfer.files;
        if (files === null || files.length < 1) {
            return;
        }
        doUpload(files[0]);
    }
};
var onChange = function (event) {
    var files = event.target.files;
    if (files === null || files.length < 1) {
        return;
    }
    doUpload(files[0]);
};
var Uploader = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", null, "Drag a photo here or click to choose file")),
        react_1.default.createElement("input", { onDrop: onDrop, type: 'file', onChange: onChange })));
};
exports.default = Uploader;
//# sourceMappingURL=index.js.map