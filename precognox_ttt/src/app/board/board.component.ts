import {Component, Input, OnInit} from '@angular/core';
import {BoardControllerService} from "../api/services/board-controller.service";
import {Board, createFormGroup} from "../api/models/board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  _board: Board = {
    id: undefined,
    board: "000000000",
    name: undefined
  };
  isOneNext = true;
  winner?: string;
  readonly fg = createFormGroup();

  constructor(private boardControllerService: BoardControllerService) {
  }

  ngOnInit() {
    this.calculateWinner();
  }

  @Input() set board(value: Board) {
    this._board = value;
    this.onBoardChanged(this._board);
  }

  get board(): Board {
    return this._board;
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
    this.checkStepsLeft();
  }

  private checkStepsLeft() {
    if (this.board.board.split('').every(v => v !== '0')) {
      window.alert('DRAW! No more steps left!');
    }
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
    if (this.fg.invalid || !this.fg.get('name') || !this.fg.get('name')?.value) {
      return;
    }
    this.board.name = this.fg.get('name')!.value as string;
    if (this.board.id) {
      this.boardControllerService.updateBoard(this.board.id, this.board)
        .subscribe(value => {
          this.board = value;
          window.alert('Saved!');
        });
    } else {
      this.boardControllerService.createBoard(this.board)
        .subscribe(value => {
          this.board = value;
          window.alert('Saved!');
        });
    }
  }

  private onBoardChanged(_board: Board) {
    this.calculateNext(_board);
    this.calculateWinner();
    this.checkStepsLeft();
    if (_board.name) {
      this.fg.get('name')?.setValue(_board.name);
    }
  }

  private calculateNext(board: Board) {
    let ones = 0;
    let twos = 0;
    let squares = board.board.split('');
    for (let x of squares) {
      if (x === '1') {
        ones++;
      } else if (x === '2') {
        twos++;
      }
    }
    this.isOneNext = twos > ones;
  }
}
