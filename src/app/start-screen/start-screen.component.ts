import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, CollectionReference, collectionData, collection, setDoc, doc, addDoc, docData, onSnapshot } from '@angular/fire/firestore';
import { Game } from 'src/models/game';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  coll: any;
  gameInfo: any;


  constructor(private router: Router, private firestore: Firestore) {

  }


  ngOnInit(): void {

  }

  async newGame() {
    //Start game
    this.coll = collection(this.firestore, 'games');
    let game = new Game();
    let gameInfo = await addDoc(this.coll, { game: game.toJson() });
    this.router.navigateByUrl('/game/' + gameInfo.id);



  }

}
