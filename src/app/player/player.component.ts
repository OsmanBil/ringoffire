import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name;
  @Input() profilePic;
  @Input() playerActive: boolean = false;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogEditPlayer(): void {
  }


}
