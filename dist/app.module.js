"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const users_controller_1 = require("./users/users.controller");
const crypting_service_1 = require("./users/crypting/crypting.service");
const posts_controller_1 = require("./posts/posts.controller");
const posts_module_1 = require("./posts/posts.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./users/roles.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/helpini'),
            users_module_1.UsersModule,
            posts_module_1.PostsModule
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController, users_controller_1.usersController, posts_controller_1.PostsController],
        providers: [app_service_1.AppService, auth_module_1.AuthModule, jwt_1.JwtService, auth_service_1.AuthService, users_module_1.UsersModule, crypting_service_1.CryptingService, {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map