import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { IsOptional, IsString, MinLength } from "class-validator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CategoriesService } from "./categories.service";

class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}
