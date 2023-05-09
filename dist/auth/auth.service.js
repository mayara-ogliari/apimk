"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validarUsuario(username, password) {
        const user = await this.usersService.findOneByEmail(username);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário ou Senha Inválidos');
        }
        if (user.password === password) {
            return await this.gerarToken(user);
        }
        throw new common_1.UnauthorizedException('Usuário ou Senha Inválidos');
    }
    async validateUserById(id) {
        return await this.usersService.findOneById(id);
    }
    async gerarToken(payload) {
        return {
            authorization: this.jwtService.sign({ email: payload.email }, {
                secret: 'topSecret512',
                expiresIn: '1d',
            }),
        };
    }
    async validateToken(token) {
        try {
            const decodedToken = await this.jwtService.verifyAsync(token, {
                secret: 'topSecret512',
            });
            return decodedToken;
        }
        catch (e) {
            console.log(e);
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map