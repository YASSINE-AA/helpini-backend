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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const crypting_service_1 = require("../users/crypting/crypting.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, cryptingService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.cryptingService = cryptingService;
    }
    async signIn(email, password) {
        const user = await this.usersService.findOne(email);
        if (user == null ||
            !(await this.cryptingService.comparePassword(password, user.password))) {
            throw new common_1.UnauthorizedException();
        }
        const payload = {
            sub: user._id,
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            phone: user.phone,
            gender: user.gender,
            roles: user.roles,
        };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: 'test',
            }),
        };
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signIn", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        crypting_service_1.CryptingService])
], AuthService);
//# sourceMappingURL=auth.service.js.map