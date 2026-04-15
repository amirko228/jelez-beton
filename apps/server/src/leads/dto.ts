import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateLeadDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(5)
  phone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  productName?: string;
}
