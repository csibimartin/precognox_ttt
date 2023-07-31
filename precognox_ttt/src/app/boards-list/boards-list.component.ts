import {Component} from '@angular/core';
import {BoardControllerService} from "../api/services/board-controller.service";
import {BoardWithId} from "../api/models/board-with-id";

@Component({
  selector: 'boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent {

  displayedColumns = ['id', 'name', 'board', 'actions'];
  dataSource: any = [];

  constructor(public boardControllerService: BoardControllerService) {
    this.boardControllerService.getBoards()
      .subscribe(c => {
        this.dataSource = c;
      });
  }

  view(client: BoardWithId) {

  }

  remove(client: BoardWithId) {

  }
}
