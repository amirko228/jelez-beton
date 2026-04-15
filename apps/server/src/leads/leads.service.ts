import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLeadDto } from "./dto";

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({ data: dto });
    this.logger.log(`Новая заявка: ${lead.name} (${lead.phone})`);
    return lead;
  }

  findAll() {
    return this.prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  }
}
