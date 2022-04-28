import { Time } from '@angular/common';

    export class DutyDate {
        dutyTypeId?: number;
        dutyNameFl?: string;
        dutyNameSl?: string;
        day?: Date;
        dutyStartDate?: Date;
        dutyEndDate?: Date;
        errorMessage?: string;        
        timeDetails?: DutyTimeDetails[];
        allowanceIn?:number;
        allowanceOut?:number;
        isWeekEnd? :boolean;
        isRestDay? :boolean;
    }
    
    export class DutyTimeDetails {
        id?: number;
        weekEnd?:string;
        restDay?:string;
        dayDate? : Date;
        startTime? : Time;
        endTime? :  Time;
        hourlyStartDateTime? : Date;
        hourlyEndDateTime? : Date;
    }
    