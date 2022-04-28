
import { OnInit, ViewChild, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shell } from '../../../component/shell';
import { Router } from '@angular/router';
import { Result } from '../models/Result';
import { DataService, APIs } from '../../../services/shared';
import { TableDetailsComponent } from '../table-details.component';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/AlertService';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { debuglog } from 'util';
export abstract class BaseListComponent implements OnInit, AfterViewInit {
    @ViewChild(TableDetailsComponent, null) dataTable: TableDetailsComponent;
    @Output() deleteClick: EventEmitter<string> = new EventEmitter<string>();
    @Output() editClick: EventEmitter<any> = new EventEmitter<any>();
    protected get Service(): DataService { return Shell.Injector.get(DataService); }
    get localize(): LocalizationService {
        return Shell.Injector.get(LocalizationService);
      }
    get Alert(): AlertService { return Shell.Injector.get(AlertService); }
    get Route(): Router { return Shell.Injector.get(Router); }
    get authService(): AuthService { return Shell.Injector.get(AuthService); }
    roles: { canAdd: any; };
    list: any[] = [];
    filter: any = {};
    @ViewChild('scrollBottom' , { static : false}) private scrollBottom: ElementRef;
    componentName: string;
    url: string;
    dateFormat = 'd-M-y';
    canAddTemp = true;
    constructor(componentName: string, url: string) {
        this.componentName = componentName;
        this.url = url;
        let permissions = this.authService.getPermissions(this.componentName);
        this.roles = {
            canAdd: permissions.add,
        };
        this.canAddTemp = this.roles.canAdd;
        this.scrollToBottom();
    }
    abstract mainLoader(x: any): Observable<any>;

    delete(id: any): void {
        this.Service.delete(`${this.url}/${id}`).subscribe((data: any) => {
            this.Alert.showSuccess(this.localize.translate.instant('Message.DeleteSuccess'));
            this.Refresh();
        }, error => {
        });
    }
    protected edit(event): void {

    }
    editCall(url: string) {
        this.roles.canAdd = true;
        return this.Service.get(`${url}`);
    }
    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
         this.loadPagedData();
    }

    Redirect() {
        let currentRoute = this.Route.url;
        let index = currentRoute.lastIndexOf('/');
        let str = currentRoute.substring(0, index);
        this.Route.navigate([str]);
    }

    loadPagedData() {
        // pass the function which returns observable to the input in datatable component (dataService) as delegate
        this.dataTable.dataService = (d: any) => this.mainLoader(d);
        // emit this event tho make the datatable listen on it to start merge function which makes it reload the data
        // at initial call
        this.dataTable.reload.emit();
    }

    Refresh(): void {
        this.ngAfterViewInit();
    }
    scrollToBottom(): void {
        try {
            this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
        } catch (err) { }
    }
    scrollToTop(): void {
        try {
            this.scrollBottom.nativeElement.scrollTop = 0;
        } catch (err) { }
    }

}
