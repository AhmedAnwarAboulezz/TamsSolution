export class EmployeePermission {
    id?: number;
    employeeId?: number;
    employeeNameFl?: string;
    employeeNameSl?: string;
    employeeNumber?: string;
    civilId?: string;

    startDate?: Date;
    startTime?: string;
    endTime?: string;

    partialPermissionTypeId?: number;
    partialPermissionFL?: string;
    partialPermissionSL?: string;

    permissionTimeId?: number;
    permissionTypeNameFl?: string;
    permissionTypeNameSl?: string;
    permissionDuration?:number;

    totalAllowances?: number;
    fileName?: string;
    filePath?: string;
    workflowStatusId? :number;


}
