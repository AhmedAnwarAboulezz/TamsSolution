export class OrganizationOverTimeReguations{
    startDate?: Date;
    endDate?: Date;
    id?: number;
    note?: string;
    mustSignForOverTime?:boolean;
    overTimeFromSpecificDevices?:boolean;
    overtimeMinimum?:number;
    overtimeMaxmumInWorkDay?:number;
    overtimeMaxmumInOffDay?:number;

    overTimeRegulationsDevices?: OverTimeRegulationsDevices[];
    isDefault?:boolean;
}
export class OverTimeRegulationsDevices {
    overTimeRegulationId?: number;
    deviceIp: string;
}