export interface IUser {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    lastLogin: Date;
    updateFlag: boolean;
}