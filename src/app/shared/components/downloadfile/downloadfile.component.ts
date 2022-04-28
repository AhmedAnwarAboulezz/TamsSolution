import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Shell } from 'src/app/component/shell';
import { DownloadFilesService } from './service/DownloadFiles.service';




@Component({
  selector: 'app-downloadfile',
  templateUrl: './downloadfile.component.html',
  styleUrls: ['./downloadfile.component.scss']
})
export class DownloadfileComponent implements OnInit {
  @Output() downloaded: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedFile: any;
  @Input() serviceName : any;

  showButton:boolean = false;
  get Service(): DownloadFilesService { return Shell.Injector.get(DownloadFilesService); }
  constructor() { }

  ngOnInit() {
    if(this.selectedFile == null || this.selectedFile == ''){
      this.showButton = false;
    }
    else{
      this.showButton = true;
    }  
  }

  download(){
    
    let extensionArr = this.selectedFile.split('.');
    let extension = extensionArr[extensionArr.length - 1].toLowerCase();
    this.downloaded.emit(extension);

   this.Service.downloadfile(this.selectedFile, this.serviceName) 
   .subscribe(response => {
      if(extension == 'png' || extension == 'jpg' || extension == 'jpeg'||extension == 'gif'){
       this.downLoadFile(response, 'image/'+extension+'')
      }
     else if(extension == 'pdf'){
     this.downLoadFile(response, 'application/pdf')
     }
   });
 }
 downLoadFile(data: any, type: string) {
   let blob = new Blob([data], { type: type });
   let url = window.URL.createObjectURL(blob);
   let pwa = window.open(url);
   if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
     alert('Please disable your Pop-up blocker and try again.');
   }
 }
}
