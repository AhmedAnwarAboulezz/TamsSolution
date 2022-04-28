export class PenaltieGroup {
    id?: number;
    penaltieGroupCode?: number;
    penaltieGroupFl?: string;
    penaltieGroupSl?: string;
    contentCount?: number;
    isForSupervisoryJob?:boolean;
    penaltieGroupDetails?: PenaltieGroupDetails[];
}

export class PenaltieGroupDetails {
    id?: number;   
    penaltieGroupId?: number;
    contentFl?: string;
    contentSl?: string;
   
}