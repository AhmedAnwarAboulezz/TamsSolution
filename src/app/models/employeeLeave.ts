export class EmployeeLeave {
    id?: number;
    employeeId?: number;
    employeeNumber?: string;
    employeeNameFl?: string;
    employeeNameSl?: string;
    civilId?: string;
    startDate?: Date;
    endDate?: Date;
    leaveRegulationId?: number;
    leaveNameFl?: string;
    leaveNameSl?: string;
    dayNumber?: number;
    actualDay?: number;
    payedDay?: number;
    unPayedDay?: number;
    balance?: number;
    leftBalance?: number;
    salaryId?: number;
    salaryLeaveFl?: string;
    salaryLeaveSl?: string;
    fileName?: string;
    filePath?: string;
    isUnpaidLeave ?: boolean;
    unPayedStartDate?:Date;
    workflowStatusId? :number;


}