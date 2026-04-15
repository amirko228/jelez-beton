import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt: { compare: (p: string, h: string) => Promise<boolean> } = require("bcryptjs");

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    const admin = await this.prisma.adminUser.findUnique({ where: { email: dto.email } });
    if (!admin) {
      throw new UnauthorizedException("Неверные логин или пароль");
    }
    const ok = await bcrypt.compare(dto.password, admin.passwordHash);
    if (!ok) {
      throw new UnauthorizedException("Неверные логин или пароль");
    }

    const token = await this.jwtService.signAsync({ sub: admin.id, email: admin.email });
    return { accessToken: token, admin: { id: admin.id, email: admin.email } };
  }
}
