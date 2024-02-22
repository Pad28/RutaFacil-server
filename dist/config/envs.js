"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    DATABASE_URL: (0, env_var_1.get)('DATABASE_URL').required().asString(),
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    PUBLIC_PATH: (0, env_var_1.get)('PUBLIC_PATH').default('public').asString(),
    JWT_SEED: (0, env_var_1.get)('JWT_SEED').required().asString(),
};
