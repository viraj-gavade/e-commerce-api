import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateSubCategoryDto)
  @IsOptional()
  subcategories?: CreateSubCategoryDto[]; // Optional array of subcategories
}
