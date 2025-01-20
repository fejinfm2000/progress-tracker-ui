import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { IKeyValuePair } from '../../models/home';

@Component({
  selector: 'app-add-task',
  standalone: false,

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  addTaskForm!: FormGroup;

  categoryDropdown: IKeyValuePair[] = []

  get subActivitiesFormArray(): FormArray {
    return this.addTaskForm?.get('subActivities') as FormArray;
  }

  constructor(private dialogRef: MatDialogRef<AddTaskComponent>, private fb: FormBuilder, private homeService: HomeService) {
    this.addTaskForm = this.fb.group({
      categoryName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      activityName: [null, Validators.required],
      description: [null, Validators.required],
      subActivities: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      startDate: [{ value: new Date(), disabled: true }, Validators.required],
      endDate: [null, Validators.required],
      status: [{ value: 'Started', disabled: true }, Validators.required],
      progress: [{ value: 0, disabled: true }, Validators.required],
    });
  }


  ngOnInit(): void {
    this.homeService.getAllCatagories().subscribe(data => {
      this.categoryDropdown = data.map(data => { return { key: data.categoryName, value: data.categoryName } })
    })
  }


  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    return date >= new Date()
  };

  addTextInput(): void {
    this.subActivitiesFormArray.push(this.fb.control('')); // Add a new text input
  }

  removeTextInput(index: number): void {
    this.subActivitiesFormArray.removeAt(index); // Remove the text input at the specified index
  }

  onSave() {
    console.log(this.addTaskForm);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
