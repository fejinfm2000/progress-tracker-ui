import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { IActivityDetails, IKeyValuePair, ISubActivity, IUserActivities } from '../../models/home';
import { DatePipe, formatDate } from '@angular/common';
import { IProjectOverView } from '../../models/web-app';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: false,

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit, OnDestroy {
  addTaskForm!: FormGroup;
  allActivityDetails!: IUserActivities;
  categoryDropdown: IKeyValuePair[] = []
  options: string[] = [];
  filteredOptions: string[] = [];
  unSubscribe$ = new Subject();

  get subActivitiesFormArray(): FormArray {
    return this.addTaskForm?.get('subActivities') as FormArray;
  }

  constructor(private dialogRef: MatDialogRef<AddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: { email: string, userActivities: IUserActivities, currentActivity: IProjectOverView }, private fb: FormBuilder, private homeService: HomeService) {
    this.allActivityDetails = data.userActivities;
    let dateObj: Date | string = ""
    if (data.currentActivity?.endDate) {
      let [day, month, year] = data.currentActivity?.endDate!.split('-').map(Number);
      dateObj = new Date(year, month - 1, day)
    }
    this.addTaskForm = this.fb.group({
      categoryName: [data.currentActivity?.title, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      activityName: [data.currentActivity?.subTitle, Validators.required],
      description: [data.currentActivity?.description, Validators.required],
      subActivities: this.generateSubActivitiesArray(),
      startDate: [{ value: new Date(), disabled: true }, Validators.required],
      endDate: [dateObj, Validators.required],
      status: [{ value: 'Started', disabled: true }, Validators.required],
      progress: [{ value: 0, disabled: true }, Validators.required],
    });

    let currentSubActivity = this.allActivityDetails?.subActivity.filter(subActivity => subActivity?.activity?.activityName === data?.currentActivity?.subTitle).map(subActivity => { return { subActivityId: subActivity.subActivityId, subActivityName: subActivity?.subActivityName, description: subActivity.description } });
    let subActivities = this.generateSubActivitiesArray();

    if (currentSubActivity?.length > 0) {
      subActivities.clear();
      currentSubActivity.forEach((data, index) => {
        subActivities.push(
          this.fb.group({
            subActivityId: this.fb.control(data.subActivityId || null),
            subActivityName: this.fb.control(data.subActivityName, index == 0 ? Validators.required : null),
            description: this.fb.control(data.description || null),
            startDate: this.fb.control(null),
            endDate: this.fb.control(null),
            progress: this.fb.control(null),
            status: this.fb.control("Started"),
          })
        );
      })
      this.addTaskForm.controls['subActivities'] = subActivities as FormArray;
    }
  }

  generateSubActivitiesGroup() {
    return this.fb.group({
      subActivityId: this.fb.control<number | null>(null),
      subActivityName: this.fb.control<string | null>(null, Validators.required),
      description: this.fb.control<string | null>(null),
      startDate: this.fb.control(null),
      endDate: this.fb.control(null),
      progress: this.fb.control(null),
      status: this.fb.control("Started"),
    })
  }
  generateSubActivitiesArray() {
    return this.fb.array([
      this.generateSubActivitiesGroup()
    ])
  }


  ngOnInit(): void {
    this.homeService.getAllCatagories().pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
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
    this.addTaskForm.get('categoryName')?.valueChanges.pipe(takeUntil(this.unSubscribe$)).subscribe(categoryName => {
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
    this.subActivitiesFormArray.push(this.generateSubActivitiesGroup()); // Add a new text input
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

    this.homeService.addActivities(data).pipe(takeUntil(this.unSubscribe$)).subscribe(data => {
      this.dialogRef.close('Y');
    })

  }

  closeDialog(): void {
    this.dialogRef.close('N');
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
  }
}
