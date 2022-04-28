import { advancedSearch } from './advancedSearch';

export class AttendanceSearch {
    employeeId?: number;
    employeeNumber?: string;
    startDate?: Date;
    endDate?: Date;
    logTypeId?: number;
    remarkId?: number;
    employeeStatusId?: number;    
    terminalSerial?:string;
    terminalIp?:string;
    advancedSearch?: advancedSearch[];
    

}

export class AttendanceSearchImage {
    employeeId?: number;
    employeeNumber?: string;
    startDate?: Date;
    logTypeId?: number;
    remarkId?: number;
    id?: number;
}
