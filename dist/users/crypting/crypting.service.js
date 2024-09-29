"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptingService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
let CryptingService = class CryptingService {
    async cryptPassword(password) {
        const saltRounds = 10;
        try {
            const salt = await (0, bcrypt_1.genSalt)(saltRounds);
            const hashedPassword = await (0, bcrypt_1.hash)(password, salt);
            return hashedPassword;
        }
        catch (error) {
            throw new Error('Error generating salt or hashing password: ' + error.message);
        }
    }
    comparePassword(original, hashed) {
        return (0, bcrypt_1.compare)(original, hashed);
    }
};
exports.CryptingService = CryptingService;
exports.CryptingService = CryptingService = __decorate([
    (0, common_1.Injectable)()
], CryptingService);
//# sourceMappingURL=crypting.service.js.map