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
    title: string,
    description: string,
    subTitle: string,
    circumference: number,
    strokeDashoffset: number,
    progress: number,
    repitation?: number,
    tasks: IAvatharTask[]

}

