import {Component, EventEmitter, Output} from '@angular/core';
import {BoardControllerService} from "../api/services/board-controller.service";
import {BoardWithId} from "../api/models/board-with-id";

@Component({
  selector: 'boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent {

  @Output() viewBoard= new EventEmitter<BoardWithId>();
  displayedColumns = ['id', 'name', 'board', 'actions'];
  dataSource: any = [];

  constructor(public boardControllerService: BoardControllerService) {
    this.reload();
  }

  private reload() {
    this.boardControllerService.getBoards()
      .subscribe(c => {
        this.dataSource = c;
      });
  }

  view(board: BoardWithId) {
    this.viewBoard.emit(board);
  }

  remove(board: BoardWithId) {
    this.boardControllerService.deleteBoard(board.id).subscribe();
  }
}
