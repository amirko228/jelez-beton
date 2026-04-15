import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { CategoriesModule } from "../categories/categories.module";
import { ProductsModule } from "../products/products.module";
import { LeadsModule } from "../leads/leads.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, CategoriesModule, ProductsModule, LeadsModule]
})
export class AppModule {}
