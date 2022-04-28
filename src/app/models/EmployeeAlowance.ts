export class EmployeeAlowance {
    id?: number;

    employeeId?: number;
    employeeNumber?: string;
    employeeNameFl?: string;
    employeeNameSl?: string;
    civilId?: string;
    startDate?: Date;
    endDate?: Date;
    allowanceIn?: number;
    allowanceOut?: number;
    allowanceId?: number;
    allowanceNameFl?:string;
    allowanceNameSl?:string;
    fileName?: string;
    notes?: string;
    daysFl?: string;
    daysSl?: string;
    employeeAllowanceWeekdays?: EmployeeAllowanceWeekday[];
}

export class EmployeeAllowanceWeekday {
    id?: number;
    employeeAllowanceId?: number;
    weekdayId?: number;
}