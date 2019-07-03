import { Process } from './../../Process/Shared/process.model';
import { Department } from './../../Department/Shared/department.model';

export interface User {
    id: number;
    name: string;
    avatar: string;
    email: string;
    Department: Department;
    Process: Process;
    isLeaderDepartment: number;
    isLeaderProcess: number;
    removed: number;
}

export interface UserToken {
    token: string;
    user: User;
}

export interface UserApi {
    name: string;
    avatar: string;
    email: string;
    idDepartment: number;
    idProcess: number;
    isLeaderDepartment: number;
    isLeaderProcess: number;
    password: string;
    removed: number;
}
