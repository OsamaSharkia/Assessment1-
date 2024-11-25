import { IsString, IsOptional } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  @IsString()
  content: string;

  @ApiProperty({ type: UserDto, description: 'The author of the comment', required: false })
  @IsOptional()
  author?: UserDto;
}