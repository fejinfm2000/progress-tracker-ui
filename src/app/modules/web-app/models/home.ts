export interface ISubActivity {
    subActivityId: number;
    subActivityName: string;
    description: string;
    startDate: string;
    endDate: string;
    progress: number;
    status: string;

}
export interface ICategory {
    categoryId: number;
    categoryName: string;
    description: string;
    createdAt: string
}
export interface IActivity {
    activityId: number;
    activityName: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    progress: string;
    category: ICategory;
    createdAt: string;
}

export interface IUserActivities {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    termsAndConditionFlag: boolean;
    activity: IActivity[];
    subActivity: ISubActivity[];
}

export interface IKeyValuePair {
    key: string,
    value: string
}