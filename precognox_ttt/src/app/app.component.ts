import {Component} from '@angular/core';
import {Board} from "./api/models/board";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTab = 0;
  board: Board = {
    id: undefined,
    board: "000000000",
    name: '' + Math.random()
  };

  onBoardSelected(event: Board) {
    if (!event) {
      return;
    }
    this.board = event;
    this.selectedTab = 0;
  }
}
