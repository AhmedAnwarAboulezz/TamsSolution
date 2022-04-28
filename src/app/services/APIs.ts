
import { ConfigService } from 'ngx-envconfig';
import { Injectable } from '@angular/core';
@Injectable()
export class APIs {
    host: any;
    constructor(public configService: ConfigService) {
        this.host = this.configService.get('host');
    }

    init(actionName: string, parm: any = null) {

        // const host = environment.host;
        // tslint:disable-next-line:no-shadowed-variable
        const APIs = {
            GetAll: !parm ? `${this.host}${actionName}/GetAllPaged` :
                `${this.host}${actionName}/GetAllPaged?offset=${parm ? parm.offset : ''}
                &limit=${parm ? parm.limit : ''}
                &sortDirection=${parm ? parm.sortDirection : ''}
                &sortField=${parm ? parm.sortField : ''}`,

            GetAllForSelect: `${this.host}${actionName}/GetDropdownList`,
            GetAllDrop: `${this.host}${actionName}/GetAll`,
            Get: `${this.host}${actionName}/Get/${parm}`,
            Add: `${this.host}${actionName}/Add`,
            Update: `${this.host}${actionName}/Update`,
            Delete: parm ? `${this.host}${actionName}/Delete/${parm}` : `${this.host}${actionName}/Delete`,
            Authenticate: `${this.host}${actionName}/Authenticate`,
            addUser: `${this.host}${actionName}/Add`,
            GetCode: `${this.host}${actionName}/GetCode/${parm}`,
            ChangePassword: `${this.host}${actionName}/ChangePassword`,
            GetAllGroupRoles: `${this.host}${actionName}/GetAll/${parm}`,
            AddOrUpdate: `${this.host}${actionName}/AddOrUpdate?groupId=${parm}`,
            customEndPoint: `${this.host}${actionName}`,
            GetByLeaveRegulationId: `${this.host}${actionName}/GetByLeaveRegulationId/${parm}`,
            Fill: `${this.host}${actionName}/Fill/${parm} & TypeProcess=${parm ? parm.TypeProcess : ''}`
        };
        return APIs;
    }
}
