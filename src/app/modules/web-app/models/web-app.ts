export interface IOverview {
    count: number,
    title: string,
}
export interface IProjectOverView {
    title: string,
    subTitle: string,
    circumference: number,
    strokeDashoffset: number,
    progress: number,
    tasks: ITask[]

}

export interface ITask {
    taskId: number,
    taskName: string
}