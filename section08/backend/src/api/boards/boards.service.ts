import {Injectable, Scope} from '@nestjs/common';
import {Board} from "./entities/board.entity";
import {IBoardsServiceCreate} from "./interfaces/boards-service.interface";

@Injectable({scope: Scope.DEFAULT})
export class BoardsService {
    findAll(): Board[] {
        const result = [
            {
                number: 1,
                writer: '철수',
                title: '제먹',
                contents: '내용',
            },
            {
                number: 2,
                writer: 'aa',
                title: 'aa',
                contents: 'aa',
            }
        ];
        return result;

    }

    create({createBoardInput}:IBoardsServiceCreate): string {

        console.log(createBoardInput.writer);

        return "게시물 등록 완료";

    }
}
