export interface ISubActivity {
    subActivityId: number;
    subActivityName: string;
    description: string;
    startDate: string;
    endDate: string;
    progress: number;
    status: string;
    activity?: IActivity;

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
    progress: number;
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

export interface IActivityDetails {
    categoryName?: string;
    email?: string;
    activityName?: string;
    description?: string;
    subActivities?: string[];
    startDate?: string;
    endDate?: string;
    status?: string;
    progress?: number;
}
export interface IKeyValuePair {
    key: string,
    value: string
}