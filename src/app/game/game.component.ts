import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Firestore, CollectionReference, collectionData, collection, setDoc, doc, addDoc, docData, onSnapshot } from '@angular/fire/firestore';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  game: Game;

  role: any;
  passedValues: any;
  gameId: any;
  coll: any;

  games$: Observable<any[]>;
  games: Array<any>

  todos$: Observable<any>;
  todos: Array<any>
  todotext: Array<any>;

  gamesoff: any;



  gamesTest = [];
  gameOver = false;


  constructor(private router: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    this.coll = collection(this.firestore, 'games');

    

  }

  ngOnInit(): void {
    this.newGame();
    

    this.router.params.subscribe(async (params) => {
      this.gameId = params['id'];


      onSnapshot(doc(this.firestore, "games", params['id']), (doc) => {
        const newGame: any = doc.data();
        console.log(newGame);


        this.updateGameData(newGame);
      });


    })



  }

  addTodo() {
    const coll = collection(this.firestore, 'todos');
    setDoc(doc(coll), { name: this.todotext });
  }



  updateGameData(newGame: any) {

    this.game.players = newGame.game.players;
    this.game.stack = newGame.game.stack;
    this.game.playedCards = newGame.game.playedCards;
    this.game.currentPlayer = newGame.game.currentPlayer;
    this.game.currentCard = newGame.game.currentCard;
    this.game.pickCardAnimation = newGame.game.pickCardAnimation;
    this.game.profilePics = newGame.game.profilePic;
  }



  newGame() {
    this.game = new Game();

    //const coll = collection(this.firestore, 'games');
    //this.games$ = collectionData(coll);
    //addDoc(coll, this.game.toJson());
  }

  takeCard() {
    if(this.game.stack.length == 0){
      this.gameOver = true;
    
     } else if (this.game.players.length > 1) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      console.log(this.game.currentCard);
     
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      
      
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    } else {
      this.openDialog();
    }
  }



  editPlayer(playerId: number): void {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent);
    dialogRef.afterClosed().subscribe(vari => {
      if (vari && vari.length > 0) {
        if (vari == "delete") {
          this.game.profilePics.splice(playerId, 1)
          this.game.players.splice(playerId, 1)
          this.saveGame();
        } else {
          const profilePic1 = vari;
          this.game.profilePics[playerId] = profilePic1;
          this.saveGame();
        }
      }
    });

  }


  openDialog(): void {
    if (this.game.players.length >= 5) {
      this.openDialog1();

    } else {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);

      dialogRef.afterClosed().subscribe((newPlayer) => {
        if (newPlayer && newPlayer.name.length > 0) {
          this.game.players.push(newPlayer.name);
          this.game.profilePics.push(newPlayer.profilePic);
          this.saveGame();
        }
      });

    }
  }

  openDialog1() {
    const dialogRef = this.dialog.open(DialogsComponent);
    dialogRef.afterClosed().subscribe(profilePic => {
    });
  }


  saveGame() {
   setDoc(doc(this.coll, this.gameId), { game: this.game.toJson() });


  }
}
