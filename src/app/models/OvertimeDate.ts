export class OvertimeDate {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    notes?: string;
   isDefault? :boolean;
    overTimeSettings?: OverTimeSettings[] | null;
}

export class OverTimeSettings {
    id?: number;
    overTimeTypeId?: number;
    overTimeTypeName?: string;
    rate?: number;
    startTime?: Date;
    endTime?: Date;
    overTimeLeaveTypesIds?: number[] | null;
    overTimeLeaveTypes?: OverTimeLeaveTypes[] | null;

}
export class OverTimeLeaveTypes {
    id?: number;
    overTimeSettingsId?: number;
    leaveTypeId?: number;

}


