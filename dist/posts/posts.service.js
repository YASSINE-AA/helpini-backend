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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const postType_schema_1 = require("./schemas/postType.schema");
let PostsService = class PostsService {
    constructor(PostModel) {
        this.PostModel = PostModel;
    }
    async create(createPostDto) {
        const createdPost = new this.PostModel(createPostDto);
        return createdPost.save();
    }
    async findAll() {
        return this.PostModel.find().exec();
    }
    async findOne(id) {
        return this.PostModel.findById(id).exec();
    }
    async update(id, updatePostDto) {
        return this.PostModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
    }
    async delete(id) {
        await this.PostModel.findByIdAndDelete(id);
    }
    async addRating(id, rating) {
        const post = await this.PostModel.findById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        post.ratings.push(rating);
        return post.save();
    }
    calculateAverageRating(post) {
        if (post.ratings.length === 0) {
            return 0;
        }
        const sum = post.ratings.reduce((total, rating) => total + rating, 0);
        return sum / post.ratings.length;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(postType_schema_1.PostType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map