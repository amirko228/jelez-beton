import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateProductDto } from "./dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query("category") category?: string) {
    return this.productsService.findAll(category);
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.productsService.findOneBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("upload/image")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./apps/server/uploads",
        filename: (_, file, cb) => cb(null, `${Date.now()}${extname(file.originalname)}`)
      })
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Request() _request: unknown) {
    return { imageUrl: `/uploads/${file.filename}` };
  }
}
