import { Department } from 'src/app/Department/Shared/department.model';

export interface Process {
    id: number;
    Department: Department;
    name: string;
    removed: number;
}

export interface ProcessApi {
    id: number;
    name: string;
    idDepartment: number;
    removed: number;
}
