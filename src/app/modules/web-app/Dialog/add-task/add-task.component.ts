import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { IActivityDetails, IKeyValuePair, IUserActivities } from '../../models/home';
import { formatDate } from '@angular/common';
import { IProjectOverView } from '../../models/web-app';

@Component({
  selector: 'app-add-task',
  standalone: false,

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  addTaskForm!: FormGroup;
  allActivityDetails!: IUserActivities;
  categoryDropdown: IKeyValuePair[] = []
  options: string[] = [];
  filteredOptions: string[] = [];

  get subActivitiesFormArray(): FormArray {
    return this.addTaskForm?.get('subActivities') as FormArray;
  }

  constructor(private dialogRef: MatDialogRef<AddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: { email: string, userActivities: IUserActivities, currentActivity: IProjectOverView }, private fb: FormBuilder, private homeService: HomeService) {
    this.allActivityDetails = data.userActivities;
    this.addTaskForm = this.fb.group({
      categoryName: [data.currentActivity?.title, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      activityName: [data.currentActivity?.subTitle, Validators.required],
      description: [null, Validators.required],
      subActivities: this.fb.array([
        this.fb.control(null, Validators.required)
      ]),
      startDate: [{ value: new Date(), disabled: true }, Validators.required],
      endDate: [null, Validators.required],
      status: [{ value: 'Started', disabled: true }, Validators.required],
      progress: [{ value: 0, disabled: true }, Validators.required],
    });

    let currentSubActivity = this.allActivityDetails?.subActivity.filter(subActivity => subActivity?.activity?.activityName === data?.currentActivity?.subTitle).map(subActivity => subActivity?.subActivityName);
    let subActivities = this.fb.array([])
    subActivities.push(this.fb.control(null, Validators.required));

    if (currentSubActivity?.length > 0) {
      subActivities.clear();
      currentSubActivity.forEach((data, index) => {
        subActivities.push(this.fb.control(data, index == 0 ? Validators.required : null));
      })
      this.addTaskForm.controls['subActivities'] = subActivities as FormArray;
    }
  }


  ngOnInit(): void {
    this.homeService.getAllCatagories().subscribe(data => {
      this.categoryDropdown = data.map(data => { return { key: data.categoryName, value: data.categoryName } })
    })
    this.onCatagorySelect();
  }


  // Handle input change and filter the options
  onInputChange(value: string): void {
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }

  onCatagorySelect() {
    this.options = this.allActivityDetails.activity.map(data => data.activityName)
    this.addTaskForm.get('categoryName')?.valueChanges.subscribe(categoryName => {
      if (categoryName) {
        this.options = this.allActivityDetails.activity?.filter(data => data.category.categoryName === categoryName)?.map(data => data.activityName) || []
      }
      this.filteredOptions = [...this.options];
    })
    this.filteredOptions = [...this.options];
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
