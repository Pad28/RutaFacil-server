"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptjsAdapter = void 0;
const bcryptjs_1 = require("bcryptjs");
exports.bcryptjsAdapter = {
    hash: (password) => {
        const salt = (0, bcryptjs_1.genSaltSync)();
        return (0, bcryptjs_1.hashSync)(password, salt);
    },
    compare: (passwrod, hashed) => {
        return (0, bcryptjs_1.compareSync)(passwrod, hashed);
    }
};
