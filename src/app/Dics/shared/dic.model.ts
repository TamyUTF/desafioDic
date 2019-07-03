import { Period } from './../../Period/Shared/period.model';
import { Status } from './../../Status/Shared/status.model';
import { User } from './../../User/Shared/user.model';

export interface Dic {
    id: number;
    user: User;
    status: Status;
    period: Period;
    description: string;
    startDate: Date;
    endDate: Date;
    finishedDate: Date;
    isLate: number;
}

export interface DicApi {
    id: number;
    idUser: number;
    idStatus: number;
    idPeriod: number;
    description: string;
    startDate: Date;
    endDate: Date;
    finishedDate: Date;
    isLate: number;
}
