export class ScreenReportDto {
    screenId?: number;
    screenName?:string;
   
}
export class RolesReportFilterDto {
    userIds?: number[];
    screensReportsDto? : ScreenReportDto[];
    organizationName: any[];
    organizationLogo: any[];
    organizationId: any[];
    screenTitle :string;
    printType : number;
}