"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const controller_1 = require("../controller");
const domain_1 = require("../../domain");
class UserController extends controller_1.AppController {
    constructor(userService) {
        super();
        this.userService = userService;
        this.createUser = (req, res) => {
            const [error, createUserDto] = domain_1.CreateUserDto.create(req.body);
            if (error || !createUserDto)
                return res.status(400).json({ error });
            this.userService.createUser(createUserDto)
                .then(user => res.json(user))
                .catch(error => this.tirggerError(error, res));
        };
        this.updateUser = (req, res) => {
            const { id } = req.params;
            const { user } = req.body;
            if (id !== user.id)
                return res.status(401).json({ error: 'No autorizado' });
            const [error, updateUserDto] = domain_1.UpdateUserDto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error || !updateUserDto)
                return res.status(400).json({ error });
            this.userService.updateUser(updateUserDto)
                .then(user => res.json(user))
                .catch(error => this.tirggerError(error, res));
        };
    }
}
exports.UserController = UserController;
