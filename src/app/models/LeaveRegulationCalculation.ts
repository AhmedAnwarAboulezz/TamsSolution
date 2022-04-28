export class LeaveRegulationCalculation {
    id?:number;
    leaveRegulationId?: number;
    balanceCaluculationWayId?: number;
    balanceCaluculationWayName?: string;
    canHaveAnotherLeaveAfter?: boolean;
    canHaveAnotherLeaveBefore?: boolean;
    canHaveAnotherLeaveInside?: boolean;
    isCalculateWeekend?: boolean;
    isCalculateRestday?: boolean;
    isCalculateHoliday?: boolean;
    leaveRegulationLeavesType?: leaveRegulationLeavesType[];

}
export class leaveRegulationLeavesType {
    leaveRegulationCalculationId?: number;
    leaveTypeId?: number;
}
