import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardsService } from './flashcards.service';
import { FlashcardSetDto } from './dto/flashcard-set.dto';


describe('FlashcardsService', () => {
  let service: FlashcardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashcardsService],
    }).compile();

    service = module.get<FlashcardsService>(FlashcardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a flashcard set', async () => {
   // Correct - create an instance of FlashcardSetDto
const flashcardSetDto = new FlashcardSetDto();
flashcardSetDto.id = '1';
flashcardSetDto.name = 'Sample Set';
flashcardSetDto.cards = [];
flashcardSetDto.comments = []; // Optional, you can leave this out if not needed
flashcardSetDto.created_at = new Date().toISOString();
flashcardSetDto.updated_at = new Date().toISOString();

const result = await service.createSet(flashcardSetDto);
expect(result).toMatchObject(flashcardSetDto);

  });
});
