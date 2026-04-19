import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLeadDto } from "./dto";
import { WhatsAppService } from "./whatsapp.service";

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly whatsapp: WhatsAppService
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({ data: dto });
    this.logger.log(`Новая заявка: ${lead.name} (${lead.phone})`);

    // Отправляем уведомление в WhatsApp (не блокирует ответ клиенту)
    const lines = [
      "🔔 Новая заявка с сайта ЖелезБетон",
      "",
      `👤 Имя: ${lead.name}`,
      `📞 Телефон: ${lead.phone}`
    ];
    if (lead.email) lines.push(`✉️ Email: ${lead.email}`);
    if (lead.productName) lines.push(`📦 Товар: ${lead.productName}`);
    if (lead.message) lines.push(`💬 Комментарий: ${lead.message}`);
    lines.push("", `🕒 ${new Date(lead.createdAt).toLocaleString("ru-RU")}`);

    void this.whatsapp.send(lines.join("\n"));

    return lead;
  }

  findAll() {
    return this.prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  }
}
