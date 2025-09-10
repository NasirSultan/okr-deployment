import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(
  name: string,
  email: string,
  password: string,
  phone?: string,
  language?: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,        // added
      language,    
    },
  });
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    language: user.language,
  };
}

async login(email: string, password: string) {

  const user = await this.prisma.user.findUnique({ where: { email } });
  if (!user) throw new UnauthorizedException('Invalid credentials');


  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new UnauthorizedException('Invalid credentials');

 
  const token = this.jwtService.sign({ sub: user.id, email: user.email });


  return {
    access_token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      language: user.language,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
}


async getUserById(id: string) {
  const user = await this.prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      language: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

  
}
