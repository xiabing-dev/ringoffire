import { Game } from './../../models/game';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  takeCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) { 
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();  
  }

  newGame() {

    console.log(this.game);
  }

  takeCard() {
    if (!this.takeCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.takeCardAnimation = !this.takeCardAnimation;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(()=> {
        this.game.playedCards.push(this.currentCard);
        this.takeCardAnimation = false;
      }, 1250);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent,);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
