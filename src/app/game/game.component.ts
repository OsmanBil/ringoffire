import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();


  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.players.length > 1) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log(this.currentCard);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    } else {
      this.openDialog();
    }
  }



  editPlayer(playerId: number): void {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent);
    dialogRef.afterClosed().subscribe(vari => {

      if (vari == "delete") {
        this.game.profilePics.splice(playerId, 1)
        this.game.players.splice(playerId, 1)
      }else{
        const profilePic1 = vari;
        this.game.profilePics[playerId] = profilePic1;
      }

  
    



    });

  }


  openDialog(): void {
    if (this.game.players.length >= 5) {
      this.openDialog1();
    } else {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      dialogRef.afterClosed().subscribe(({ name, profilePic }) => {
        this.game.players.push(name);
        this.game.profilePics.push(profilePic);
      });
    }
  }






  openDialog1() {
    const dialogRef = this.dialog.open(DialogsComponent);
    dialogRef.afterClosed().subscribe(profilePic => {
    });
  }

}
