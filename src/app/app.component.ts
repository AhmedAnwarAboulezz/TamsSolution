import { Component, Injector } from '@angular/core';
import { Shell } from './component/shell';
import { BaseComponent } from './component/BaseComponent';
import { LocalizationService } from './services/localization/localization.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  constructor(
    public inj: Injector,
    public localizationService: LocalizationService,
    private router: Router,
    private titleService: Title

  ) {
    super();
    Shell.Injector = inj;
  }

  ngOnInit() 
  {
    this.localizationService.setDefaultLanguage();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router)
    ).subscribe(event =>{ 
      const title = this.getTitle(this.router.routerState.snapshot.url);
      this.titleService.setTitle(title);  
    });
  }


  getTitle(state):string {
    let data = "Home";
    if (state) 
    {
      let urlpath = state.split('/');
      let currentRoute = urlpath[urlpath.length-1];
      let componantName:string = currentRoute;
      componantName = componantName.charAt(0).toUpperCase() + componantName.slice(1);
      if(componantName.includes('?')){
        componantName = componantName.split('?')[0];
      }
      if(componantName.includes('-'))
      {
        let newComponantName = "";
        let nameSplit = componantName.split('-');
        nameSplit.forEach(element =>{
           element = element.charAt(0).toUpperCase() + element.slice(1);
           newComponantName = newComponantName + element;
        });
        componantName =newComponantName;
      }
      data = "ScreenName."+ componantName + "Component";
    }
    data = this.localizationService.translate.instant(data) + " - TAMS";
    return data;
  }
 
}
