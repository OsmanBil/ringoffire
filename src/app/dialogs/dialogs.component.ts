import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  name: string = '';

  constructor(public dialogRef: MatDialogRef<DialogsComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
