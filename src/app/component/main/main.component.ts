import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { BaseComponent } from '../BaseComponent';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { UsermangmentsService } from './user-management/usermangments/services/usermangments.service';
import { Shell } from '../shell';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TreeNode } from 'src/app/shared/components/tree/models/tree';
import { HttpService } from 'src/app/services/http/http.service';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit, OnDestroy {

  MenuHide = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  panelOpenState = false;
  year: any = new Date().getFullYear();
  param = { value: 'world' };
  // tslint:disable-next-line:variable-name
  Organizations_data: any;

  logoFl: any;
  logoSl: any;
  employeeimage: any;
  private connection: signalR.HubConnection;
  get Service(): UsermangmentsService { return Shell.Injector.get(UsermangmentsService); }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private sanitizer: DomSanitizer,
    public authService: AuthService,
    public storageService: StorageService,
    public localizationService: LocalizationService,
    private titleService: Title,
    public http: HttpClient,
    public httpService: HttpService,

  ) {
    super();
    this.connection = new signalR.HubConnectionBuilder().withUrl(`${this.Service.logoutHub}logout`)
      .withAutomaticReconnect().build();
    this.connect();
  }

  async ngOnInit() {
    await this.OrganizationsData();
    this.getScreenAuthorities();
    // this.changeLanguage( this.localizationService.lang, true);
  }

  OrganizationsData() {
    if (localStorage.getItem('Organizations_data') === null) {
      this.getOrganizationById();
    }
    this.Organizations_data = JSON.parse(localStorage.getItem('Organizations_data'));

    this.logoFl = this.sanitizer.bypassSecurityTrustResourceUrl(this.Organizations_data.logoURLFl);
    this.logoSl = this.sanitizer.bypassSecurityTrustResourceUrl(this.Organizations_data.logoURLSl);

    this.Service.getEmployeeImage().subscribe((res: any) => {

      if (res != null || res != '') {
        this.employeeimage = (res ? res : 'https://www.w3schools.com/howto/img_avatar.png');
      }
    }, () => {

    });

  }
  getOrganizationById() {
    let languageStorage = localStorage.getItem('language');
    this.service.get(this.APIs.init('Organizations/GetByOrganizationId').customEndPoint).subscribe(res => {
      localStorage.setItem('Organizations_data', JSON.stringify(res));
      if (!languageStorage) {
        localStorage.setItem('language', res.primaryLanguage.toLowerCase());
      }
    });
  }
  hideMenu() {
    this.MenuHide = !this.MenuHide;
  }

  async logout() {
    this.Service.setUserIsLogedOut().subscribe(async (res: any) => {
      await this.authService.logout();
    }, async error => {
      await this.authService.logout();
    });

    this.storageService.removeStorgeByKey('cardsLastUpdate');
    this.storageService.removeStorgeByKey('homeData');
    this.storageService.removeStorgeByKey('TheTree');
    let organization = JSON.parse(localStorage.getItem('Organizations_data'));
    await this.router.navigate(['/login'], { queryParams: { code: organization.code } });
  }

  getScreenAuthorities() {
    this.authService.loadScreenAuthorities();
  }

  go(data) {

    this.router.navigate([data.urlPath], { state: data });

  }

  changeLanguage(culture: string) {
    this.localizationService.changeLang(culture);
    let componantName = this.getTitle(this.router.routerState.snapshot.url);
    // let urlpath = this.router.url.split('/');
    // let parentRoute = urlpath[urlpath.length-2];
    // let currentRoute = urlpath[urlpath.length-1];
    // let parentComponant = this.route.routeConfig.children.filter(a=>a.path == parentRoute)[0];
    // if (parentComponant.loadChildren && parentComponant.loadChildren.length > 0) 
    // {
    //   
    //   var routerConfig = <any>(<any>parentComponant)['_loadedConfig'];
    //   if (routerConfig) {
    //       componantName = routerConfig.routes.filter(a=>a.path == currentRoute)[0].component.name;
    //   }
    // }
    this.titleService.setTitle(componantName);
    this.loadtree(culture);

  }
  loadtree(culture: string) {
    let urltree = 'AdministrativeLevels/GetTree';
    let Treedata: any;
    this.http.get<TreeNode[]>(this.httpService.serverUrl + urltree).subscribe((res: TreeNode[]) => {
      Treedata = res;
      this.storageService.removeStorgeByKey('TheTree');
      this.storageService.setItem('TheTree', JSON.stringify(Treedata));
      // this.localizationService.changeLang(culture);
      // let componantName = this.getTitle(this.router.routerState.snapshot.url);
      // this.titleService.setTitle(componantName);
    });
  }

  getTitle(state): string {
    let data = '';
    if (state) {
      let urlpath = state.split('/');
      let currentRoute = urlpath[urlpath.length - 1];
      let componantName: string = currentRoute;
      componantName = componantName.charAt(0).toUpperCase() + componantName.slice(1);
      if (componantName.includes('?')) {
        componantName = componantName.split('?')[0];
      }
      if (componantName.includes('-')) {
        let newComponantName = '';
        let nameSplit = componantName.split('-');
        nameSplit.forEach(element => {
          element = element.charAt(0).toUpperCase() + element.slice(1);
          newComponantName = newComponantName + element;
        });
        componantName = newComponantName;
      }
      data = 'ScreenName.' + componantName + 'Component';
    }
    data = this.localizationService.translate.instant(data) + ' - TAMS';
    return data;
  }
  private connect() {
    // logout
    console.log('logoutConnect');
    this.connection.start().catch(err => console.log(err));
    this.connection.on('Logout', userId => {
      let user = this.authService.currentUser;
      if (userId === (user.OrganizationId + user.UserName)) { this.logout(); }
    });
  }
  public disconnect() {
    this.connection.stop();
  }
  ngOnDestroy(): void {
    this.disconnect();
  }
}
