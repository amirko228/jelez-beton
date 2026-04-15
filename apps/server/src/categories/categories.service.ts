import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({ orderBy: { createdAt: "desc" } });
  }

  create(data: { name: string; slug: string; description?: string }) {
    return this.prisma.category.create({ data });
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
