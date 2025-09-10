import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('phone') phone?: string,
    @Body('language') language?: string
  ) {
    return this.authService.register(name, email, password, phone, language);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.authService.login(email, password);
  }

  // Protected route to fetch logged-in user profile
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.getUserById(req.user.userId);
  }
}
