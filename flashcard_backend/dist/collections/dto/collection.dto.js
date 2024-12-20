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
exports.CollectionDto = void 0;
const class_validator_1 = require("class-validator");
const flashcard_set_dto_1 = require("../../flashcards/dto/flashcard-set.dto");
const swagger_1 = require("@nestjs/swagger");
class CollectionDto {
}
exports.CollectionDto = CollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the collection',
        example: 'Science Facts',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of flashcard sets within the collection',
        type: [flashcard_set_dto_1.FlashcardSetDto],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CollectionDto.prototype, "sets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the flashcard set to include in the collection', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CollectionDto.prototype, "flashcardSetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional comment about the collection',
        example: 'This collection contains fun facts about science!',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "comment", void 0);
//# sourceMappingURL=collection.dto.js.map