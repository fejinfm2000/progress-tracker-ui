import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  standalone: false,

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  constructor(private dialogRef: MatDialogRef<AddTaskComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
