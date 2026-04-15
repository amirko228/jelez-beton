import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.product.findMany({
      where: category ? { category: { slug: category }, isPublished: true } : { isPublished: true },
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });
  }

  findOneBySlug(slug: string) {
    return this.prisma.product.findUnique({ where: { slug }, include: { category: true } });
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: { ...dto, specs: JSON.parse(dto.specs) }
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Товар не найден");
    await this.prisma.product.delete({ where: { id } });
    return { success: true };
  }
}
