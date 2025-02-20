export interface IOverview {
    count: number,
    title: string,
}
export interface IAvatharTask {
    imageUrl?: string;
    taskName: string;
    taskInitials?: string;
}
export interface IProjectOverView {
    activityId: number,
    title: string,
    description: string,
    startDate?: string;
    endDate?: string;
    subTitle: string,
    circumference: number,
    strokeDashoffset: number,
    progress: number,
    repitation?: number,
    tasks: IAvatharTask[],
    tasksCount: number

}

