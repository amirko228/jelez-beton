import { IsBoolean, IsJSON, IsNumberString, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  slug!: string;

  @IsString()
  description!: string;

  @IsNumberString()
  price!: string;

  @IsString()
  categoryId!: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsJSON()
  specs!: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
