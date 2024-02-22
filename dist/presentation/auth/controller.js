"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const domain_1 = require("../../domain");
const controller_1 = require("../controller");
class AuthController extends controller_1.AppController {
    constructor(authService) {
        super();
        this.authService = authService;
        this.verifyToken = (req, res) => {
            const token = req.header('Authorization');
            res.json({
                user: req.body.user,
                token: token.split(' ').at(1)
            });
        };
        this.loginUser = (req, res) => {
            const [error, loginUserDto] = domain_1.LoginUserDto.create(req.body);
            if (error || !loginUserDto)
                return res.status(400).json({ error });
            this.authService.loginUser(loginUserDto)
                .then(result => res.json(Object.assign({}, result)))
                .catch(error => this.tirggerError(error, res));
        };
    }
}
exports.AuthController = AuthController;
