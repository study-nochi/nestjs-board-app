import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.userService.signUp(authcredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authcredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // 토큰이 없거나 유효하지 않으면 401 에러를 반환
  test(@Req() req) {
    console.log('req', req);
  }
}
