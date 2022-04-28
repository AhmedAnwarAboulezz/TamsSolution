export class EmployeeFulldayPermission {
    id?: number;
    employeeId?: number;
    employeeNumber?: string;
    employeeNameFl?: string;
    employeeNameSl?: string;
    civilId?: string;
    startDate?: Date;
    endDate?: Date;
    fullDayId?: number;
    fullDayPermissionFL?: string;
    fullDayPermissionSL?: string;
    fileName?: string;
    daysFl?: string;
    daysSl?: string;
    fullDayPermissionWeekdays?: FullDayPermissionWeekday[];
    filePath?: string;
    comment?: string;
    workflowStatusId? :number;


}

export class FullDayPermissionWeekday {
    id?: number;
    fullDayPermissionId?: number;
    weekdayId?: number;
}
