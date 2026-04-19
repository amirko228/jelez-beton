import { Module } from "@nestjs/common";
import { LeadsController } from "./leads.controller";
import { LeadsService } from "./leads.service";
import { WhatsAppService } from "./whatsapp.service";

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, WhatsAppService]
})
export class LeadsModule {}
