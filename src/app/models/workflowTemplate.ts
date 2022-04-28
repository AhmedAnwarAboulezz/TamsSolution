export class WorkflowTemplate {
    id?: number;
    nameFl?: string;
    nameSl?: string;
    startDate?: Date;
    endDate?: Date;
    stageNumber?: number;
    isActive?: boolean;
    restDayId?:number;
    weekendDayId?:number;
    stages?: Stage[];
    workflowTemplateAdministrative?: WorkflowAdminstrations[];
    workflowTemplateRequestType?: WorkflowRequestTypes[];
}

export class Stage {
    id?: number;
    nameFl?: string;
    nameSl?: string;
    canPost?: boolean;
    postDurationInHours?: number;
    teamId?: number;
    workflowTemplateId?: number;
    managerCodeId?: number; 
    creationDate?: Date;
    mangerCode: any;
    canReceiveEmail?: boolean;
    isImportant?: boolean;
    isIgnoreWeekend?: boolean;
    isIgnoreRestDay?: boolean;
    isIgnoreHoliday?: boolean;
 
}

export class WorkflowRequest {
    workFlowId ?: number;
    workflowTemplateRequestType?: WorkflowRequestTypes[];
    workflowTemplateAdministrative?: WorkflowAdminstrations[];
}

export class WorkflowRequestTypes {
    workflowTemplateId ?: number;
    requestTypeId ?: number;
    requestTypeDetailsId?: number;
}
export class WorkflowAdminstrations {
    workflowTemplateId ?: number;
    administrativeLevelId?: number;
}




// export class WorkflowRequestData {
//     workFlowTemplateId ?: number;
//     requestTypeId ?: number;
//     requestTypeForeignkey?: number;
//     adminstrativeId?: number;
// }
