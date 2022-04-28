export class ApproveOverTime{
    id?: number;
    descriptionFl? : string;   
    descriptionSl? : string;
    employeeId? : number;      
    employeeNameFl? :string;
    employeeNameSl? :  string;
    month? : number;
    year? : number;
}

export class ApproveOverTimeDetails {
    id?: number;
    employeeId?: number;
    approveOverTimeId?: number;
    morningTime?: number;
    nightTime?: number; 
    weekEndTime?: number; 
    holidayTime?: number; 
    actualMorningTime?: number; 
    actualNightTime?: number; 
    actualWeekEndTime?: number; 
    actualHolidayTime?: number; 
    daysOfOvertime?: number;
}