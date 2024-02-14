import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() user: LoginUserDto): Promise<object> {
    return this.userService.login(user.username, user.password);
  }

  @UseGuards(AuthGuard)
  @Get('get-me')
  getMe(@Request() req: Request & { user: { id: string } }): Promise<object> {
    return this.userService.getMe(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Put('get-me')
  updateUser(
    @Body() user: LoginUserDto,
    @Request() req: Request & { user: { id: string } },
  ): Promise<object> {
    return this.userService.updateUser(
      req.user.id,
      user.username,
      user.password,
    );
  }
}
