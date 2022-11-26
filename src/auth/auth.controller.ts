import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './models/login.dto';
import { RegisterDto } from './models/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  };

  @Post("register")
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.confirmPassword) {
      return "Password and confirm password must match";
    }
    return this.authService.register(body);
  };
}
