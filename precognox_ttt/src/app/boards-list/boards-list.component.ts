import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BoardControllerService} from "../api/services/board-controller.service";
import {BoardWithId} from "../api/models/board-with-id";
import {Board} from "../api/models/board";

@Component({
  selector: 'boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent {

  @Output() viewBoard = new EventEmitter<Board>();
  displayedColumns = ['id', 'name', 'board', 'actions'];
  dataSource: any = [];
  @Input() set activeTab(tab: number) {
    this.reload();
  }

  constructor(public boardControllerService: BoardControllerService) {
    this.reload();
  }

  reload() {
    this.boardControllerService.getBoards()
      .subscribe(c => {
        this.dataSource = c;
      });
  }

  view(board: BoardWithId) {
    this.viewBoard.emit(board);
  }

  remove(board: BoardWithId) {
    this.boardControllerService.deleteBoard(board.id).subscribe(() => this.reload());
  }
}
