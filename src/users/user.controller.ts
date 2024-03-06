import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Response } from 'express';
import { join } from 'path';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('image/:filename')
  async getImage(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    const imagePath = join(
      process.cwd(),
      'nest-template',
      '..',
      'uploads',
      filename,
    );
    res.sendFile(imagePath);
  }

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
