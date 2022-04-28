import { Time } from '@angular/common';
export class OverTimeOrder {
    id?: number;
     decisionNumber? : number;   
     employeeId? : number;      
     employeeNameFl? :string;
     employeeNameSl? :  string;     
     startDate? :Date;
     endDate? :Date;
     startTime? : Time;
     endTime? : Time;
     minimumOvertime? : number;
     isMustSignOverTime? :boolean;
     fileName? :string;
     daysFl? :string;
     daysSl? :string;
     overTimeOrderWeekdays? :OverTimeOrderWeekday[];
}
export class OverTimeOrderWeekday {
    id: number;
    overTimeOrderId: number;
    weekdayId: number;
}

export class OverTimeEmployee {
    overTimeOrderId: number;
    employeeId: number;
    isActive:boolean = true;
    functionType?: string;    
}