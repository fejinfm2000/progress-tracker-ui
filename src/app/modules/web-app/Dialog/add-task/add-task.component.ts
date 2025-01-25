import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { IActivityDetails, IKeyValuePair } from '../../models/home';
import { formatDate } from '@angular/common';

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

  constructor(private dialogRef: MatDialogRef<AddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: { email: string }, private fb: FormBuilder, private homeService: HomeService) {
    this.addTaskForm = this.fb.group({
      categoryName: [null, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      activityName: [null, Validators.required],
      description: [null, Validators.required],
      subActivities: this.fb.array([
        this.fb.control(null, Validators.required)
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
    this.subActivitiesFormArray.push(this.fb.control(null)); // Add a new text input
  }

  removeTextInput(index: number): void {
    this.subActivitiesFormArray.removeAt(index); // Remove the text input at the specified index
  }

  onSave() {
    const formatDate = (date: Date): string => {
      return new Intl.DateTimeFormat('en-GB').format(date).replace(/\//g, '-');;
    };
    let data = {
      ...this.addTaskForm.getRawValue(),
      endDate: formatDate(this.addTaskForm.getRawValue().endDate),
      startDate: formatDate(new Date()),
      subActivities: (this.addTaskForm.getRawValue().subActivities as []).filter(data => data)
    } as IActivityDetails
    this.homeService.addActivities(data).subscribe(data => {
      this.dialogRef.close('Y');
    })

  }

  closeDialog(): void {
    this.dialogRef.close('N');
  }
}
