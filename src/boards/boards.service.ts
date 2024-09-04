import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { description, title } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC, // default status
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  // getBoardById(id: string): Board {
  //   const foundBoard = this.boards.find((board) => board.id === id);
  //   if (!foundBoard) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return foundBoard;
  // }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  // deleteBoard(id: string): void {
  //   const foundBoard = this.getBoardById(id);
  //   if (!foundBoard) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
