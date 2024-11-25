import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionDto } from './dto/collection.dto';
import { FlashcardSet } from '../flashcards/entities/flashcard-set.entity';
import {CommentDto} from '../flashcards/dto/comment.dto';
import { Comment } from '../flashcards/entities/comment.entity'; // Import Comment entity
@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,

    @InjectRepository(FlashcardSet)
    private readonly flashcardSetRepository: Repository<FlashcardSet>, // Inject FlashcardSet repository

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  // Find all collections, including related flashcard sets
  async findAllCollections(): Promise<Collection[]> {
    return this.collectionRepository.find({ relations: ['sets'] });
  }

  // Redirect to a random collection
  async redirectToRandomCollection(): Promise<Collection> {
    const collections = await this.collectionRepository.find();
    if (!collections.length) {
      throw new NotFoundException('No collections found');
    }
    const randomIndex = Math.floor(Math.random() * collections.length);
    return collections[randomIndex];
  }
  
  // Find a collection by its ID, including related flashcard sets
  async findCollectionById(id: number): Promise<Collection> {
    return this.collectionRepository.findOne({
      where: { id },
      relations: ['sets', 'comments'],
    });
  }


  async createCollection(collectionDto: CollectionDto): Promise<Collection> {
    const flashcardSets = await this.flashcardSetRepository.findByIds(collectionDto.sets);
    const collection = this.collectionRepository.create({ name: collectionDto.name, sets: flashcardSets });
    return this.collectionRepository.save(collection);
  }

  async updateCollectionById(id: number, collectionDto: CollectionDto): Promise<Collection> {
    const collection = await this.findCollectionById(id);
    if (collectionDto.sets && collectionDto.sets.length) {
      const flashcardSets = await this.flashcardSetRepository.findByIds(collectionDto.sets);
      collection.sets = flashcardSets;
    }
    collection.name = collectionDto.name || collection.name;
    return this.collectionRepository.save(collection);
  }

  async addCommentToCollection(collectionId: number, commentDto: CommentDto): Promise<Comment> {
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
      relations: ['comments'],
    });
  
    if (!collection) {
      throw new Error('Collection not found');
    }
  
    // Create a new comment and associate it with the collection
    const comment = this.commentRepository.create({
      content: commentDto.content, // Make sure content is provided from commentDto
      collection,
    });
  
    return await this.commentRepository.save(comment);
  }

  // Delete a collection by its ID
  async deleteCollectionById(id: number): Promise<void> {
    const result = await this.collectionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }
  }
}
