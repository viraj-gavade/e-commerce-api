import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto {
    name?: string; // Optional field
    description?: string; // Optional field
    parentId?: number | null; // Nullable field to handle no parent
  }
