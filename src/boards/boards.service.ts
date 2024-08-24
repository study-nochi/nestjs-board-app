import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v4 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { description, title } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC, // default status
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const foundBoard = this.boards.find((board) => board.id === id);

    if (!foundBoard) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return foundBoard;
  }

  deleteBoard(id: string): void {
    const foundBoard = this.getBoardById(id);

    if (!foundBoard) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
