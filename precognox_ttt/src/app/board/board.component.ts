import {Component, Input, OnInit} from '@angular/core';
import {BoardControllerService} from "../api/services/board-controller.service";
import {Board} from "../api/models/board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  @Input()
  board: Board = {
    id: undefined,
    board: "000000000",
    name: '' + Math.random()
  };
  isOneNext = true;
  winner?: string;

  constructor(private boardControllerService: BoardControllerService) {
  }

  ngOnInit() {
    this.calculateWinner();
  }

  get size() {
    return Math.sqrt(this.board.board.length);
  }

  get tileHeight() {
    return innerHeight / this.size / 2;
  }

  newGame() {
    this.board = {
      id: undefined,
      board: "000000000",
      name: '' + Math.random()
    };
    this.winner = undefined;
    this.isOneNext = true;
  }

  get player() {
    return this.isOneNext ? '1' : '2';
  }

  move(i: number) {
    if (this.winner) {
      return;
    }

    if (this.board.board?.[i] === '0') {
      this.board.board = this.board.board.slice(0, i) + this.player + this.board.board.slice(i + 1);
      this.isOneNext = !this.isOneNext;
    }
    this.calculateWinner();
  }

  calculateWinner() {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let x of wins) {
      if (
        this.board.board[x[0]] && this.board.board[x[0]] !== '0' &&
        this.board.board[x[0]] === this.board.board[x[1]] &&
        this.board.board[x[0]] === this.board.board[x[2]]
      ) {
        this.winner = this.board.board[x[0]];
        window.alert('Player ' + this.board.board[x[0]] + ' won!');
      }
    }
  }

  save() {
    if (this.board.id) {
      this.boardControllerService.updateBoard(this.board.id, this.board)
        .subscribe(value => this.board = value);
    } else {
      this.boardControllerService.createBoard(this.board)
        .subscribe(value => this.board = value);
    }
  }
}
