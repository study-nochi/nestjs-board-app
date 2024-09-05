import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  // private 선언 시, 암묵적으로 this.boardsService가 사용이 가능하다.
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(@GetUser() user: User) {
    return this.boardsService.getAllBoards(user);
  }

  // @Get()
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User) {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number) {
    return this.boardsService.getBoardById(id);
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  // ParseIntPipe를 사용하여 id를 number만 받음.
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.deleteBoard(id);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   return this.boardsService.deleteBoard(id);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
