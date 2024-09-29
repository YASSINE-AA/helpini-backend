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
exports.usersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const crypting_service_1 = require("./crypting/crypting.service");
const user_schema_1 = require("./schemas/user.schema");
const auth_guard_1 = require("../auth/auth.guard");
const jwt_decode_1 = require("jwt-decode");
const platform_express_1 = require("@nestjs/platform-express");
let usersController = class usersController {
    constructor(usersService, cryptingService) {
        this.usersService = usersService;
        this.cryptingService = cryptingService;
    }
    async register(newUser) {
        try {
            console.log(newUser);
            newUser.password = await this.cryptingService.cryptPassword(newUser.password);
            await this.usersService.create(newUser);
            return common_1.HttpStatus.CREATED;
        }
        catch (e) {
            throw new common_1.HttpException('Bad Request', e);
        }
    }
    async updateCategories(categories, request) {
        try {
            const authToken = request.headers.authorization.replace('Bearer', '').trim();
            const decodedToken = (0, jwt_decode_1.jwtDecode)(authToken);
            console.log(authToken);
            await this.usersService.updateCategories(decodedToken.email, categories);
            return common_1.HttpStatus.OK;
        }
        catch (e) {
            throw new common_1.HttpException('Bad Request', e);
        }
    }
    async uploadProfilePicture(file, req) {
        const authToken = req.headers.authorization.replace('Bearer', '').trim();
        const decodedToken = (0, jwt_decode_1.jwtDecode)(authToken);
        const base64Image = file.buffer.toString('base64');
        return this.usersService.saveProfilePicture(decodedToken.email, base64Image);
    }
    async getProfilePicture(email, res) {
        try {
            const user = await this.usersService.findOne(email);
            if (user && user.profilePicture) {
                res.type('image/jpeg').send(user.profilePicture);
            }
            else {
                throw new common_1.NotFoundException('User not found or profile picture not available');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch profile picture');
        }
    }
    async updateInfo(newInfo, request) {
        try {
            const authToken = request.headers.authorization.replace('Bearer', '').trim();
            const decodedToken = (0, jwt_decode_1.jwtDecode)(authToken);
            console.log(authToken);
            await this.usersService.update(newInfo, decodedToken.email);
            return common_1.HttpStatus.OK;
        }
        catch (e) {
            throw new common_1.HttpException('Bad Request', e);
        }
    }
};
exports.usersController = usersController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('updateCategories'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "updateCategories", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('uploadProfilePicture'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.Get)('profilePicture/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "getProfilePicture", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('updateInfo'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "updateInfo", null);
exports.usersController = usersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, crypting_service_1.CryptingService])
], usersController);
//# sourceMappingURL=users.controller.js.map