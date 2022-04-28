import { LatLng, MapsAPILoader } from '@agm/core';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Shell } from 'src/app/component/shell';
import { GoogleMapService } from './service/GoogleMap.service';
declare const google: any;




@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  title = 'My first AGM project';
  @Input() lat = 29.9649024;
  @Input() lng = 31.2700539;
  zoom: number = 19;
  polygon: any;
  marker: marker = {lat : 29.9649024, lng : 31.2700539, label: 'CL', draggable: true};
  @Input() pointList:ZoneDetail[] = [];
  selectedArea = 0;

  initPointList: LatLng[] = [];

  @Input() mapType = 'polygon';
  @Input() circleRadius = 10; 
  @Output() applyZone: EventEmitter<any> = new EventEmitter<any>();


  polygonOptionsMap = {
    drawingControl: true,
    drawingControlOptions: {
      //drawingModes: ['polygon','circle']
      drawingModes: ['polygon']
    },
    polygonOptions: {
      draggable: false,
      editable: true,
      fillColor: 'red'
    },
    //drawingMode: "polygon" ,
    //drawingMode: google.maps.drawing.OverlayType.POLYGON
  };

  address: string;
  private geoCoder;
  drawingManager: any;
  drawingManagerInit: any;

  selectedShape: any;
  @ViewChild('search',null) public searchElementRef: ElementRef;
  get Service(): GoogleMapService { return Shell.Injector.get(GoogleMapService); }

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    console.log(this.pointList);
    this.pointList.forEach(item =>{
      let rr: any = {
        lat: item.lat,
        lng: item.lng
      };
      this.initPointList.push(rr);
    });
  }
  ngAfterViewInit(){
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          this.setCurrentPosition();
          this.geoCoder = new google.maps.Geocoder;    
          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }    
              //set latitude, longitude and zoom
              this.updateCredentials(place.geometry.location.lat(), place.geometry.location.lng());
              this.zoom = 12;
              this.getAddress(place.geometry.location.lat(), place.geometry.location.lng());
            });
          });
        });
  }

  getCurrentLocation(){
    if(this.mapType == 'polygon'){
      this.deleteSelectedShape();
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.updateCredentials(position.coords.latitude, position.coords.longitude);
        this.getAddress(this.lat, this.lng);
      });
    }
  }

  setCurrentPosition() {
    if(this.lat != null && this.lng != null){
      this.updateCredentials(this.lat, this.lng);
      this.getAddress(this.lat, this.lng);
    }
    else{
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.updateCredentials(position.coords.latitude, position.coords.longitude);
          this.getAddress(this.lat, this.lng);
        });
      }
    }

  }


  clickedMarker(label: string) {
    console.log(`clicked the marker: ${label}`)
  }

  mapClicked($event: any) {
    this.updateCredentials($event.coords.lat, $event.coords.lng);
    this.getAddress(this.lat, this.lng);
  }
  
  markerDragEnd($event: any) {
    this.updateCredentials($event.coords.lat, $event.coords.lng);
    this.deleteSelectedShape();
    this.getAddress(this.lat, this.lng);


  }


   radiusChange($event: any) {
      console.log('drag circle', $event);
      this.circleRadius = $event;
      this.apply();
    }


    getAddress(latitude, longitude) {
      let lnglat =  {
         lat: latitude, lng: longitude
      } 
      this.Service.getCurrentAddress(lnglat).subscribe(res=>{
        if(res !== null && res.display_name !== ''){
         let currenAdd = res.display_name.split(',');
        //  ttt.splice(4, ttt.length - 4);
        currenAdd = currenAdd.slice(0, 4);
         this.address = "";
         for(var i=0; i<currenAdd.length; i++){
           if(i == 0 || i == 1) this.address = this.address + currenAdd[i];
           else this.address = this.address + " - " + currenAdd[i];
         }
         //this.address = ttt[0] + ttt[1]+ " , "+ ttt[2] + " , "+ ttt[3];
        }
      });
      
      // let geocoder2 = new google.maps.Geocoder();
      // let latlng = new google.maps.LatLng(latitude, longitude);
      //     let request = {
      //       latLng: latlng
      //     };
      // geocoder2.geocode(request, (results, status) => {
      //   console.log(results);
      //   console.log(status);
      //   if (status === 'OK') {
      //     if (results[0]) {
      //       this.zoom = 12;
      //       this.address = results[0].formatted_address;
      //     } else {
      //       window.alert('No results found');
      //     }
      //   } else {
      //     //window.alert('Geocoder failed due to: ' + status);
      //   }
  
      // });
    }
  



  // polygonCreated($event) {

  //   if (this.polygon) {
  //     this.polygon.setMap(null);
  //   }
  //   this.polygon = $event;
  //   this.addPolygonChangeEvent(this.polygon);
  //   google.maps.event.addListener(this.polygon, 'coordinates_changed', function (index, obj) {
  //     // Polygon object: yourPolygon
  //     console.log('coordinates_changed');
  //   });

  // }

  // getPaths() {
  //   console.log("get path");
  //   if (this.polygon) {
  //     const vertices = this.polygon.getPaths().getArray()[0];
  //     let paths = [];
  //     vertices.getArray().forEach(function (xy, i) {
  //       // console.log(xy);
  //       let latLng = {
  //         lat: xy.lat(),
  //         lng: xy.lng()
  //       };
  //       paths.push(JSON.stringify(latLng));
  //     });
  //     return paths;
  //   }
  //   return [];
  // }

  // addPolygonChangeEvent(polygon) {
  //   var me = polygon,
  //     isBeingDragged = false,
  //     triggerCoordinatesChanged = function () {
  //       // Broadcast normalized event
  //       google.maps.event.trigger(me, 'coordinates_changed');
  //     };

  //   // If  the overlay is being dragged, set_at gets called repeatedly,
  //   // so either we can debounce that or igore while dragging,
  //   // ignoring is more efficient
  //   google.maps.event.addListener(me, 'dragstart', function () {
  //     isBeingDragged = true;
  //   });

  //   // If the overlay is dragged
  //   google.maps.event.addListener(me, 'dragend', function () {
  //     triggerCoordinatesChanged();
  //     isBeingDragged = false;
  //   });

  //   // Or vertices are added to any of the possible paths, or deleted
  //   var paths = me.getPaths();
  //   paths.forEach(function (path, i) {
  //     google.maps.event.addListener(path, "insert_at", function () {
  //       triggerCoordinatesChanged();
  //     });
  //     google.maps.event.addListener(path, "set_at", function () {
  //       if (!isBeingDragged) {
  //         triggerCoordinatesChanged();
  //       }
  //     });
  //     google.maps.event.addListener(path, "remove_at", function () {
  //       triggerCoordinatesChanged();
  //     });
  //   });
  // };

  
  updatePointList(path) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(
        path.getAt(i).toJSON()
      );
    }
    if(path.getAt(0) !== null) this.pointList.push(path.getAt(0).toJSON());    
    this.selectedArea = google.maps.geometry.spherical.computeArea(path);
    this.apply();
  }

  initDrawingManager(map: any) {
    if(this.initPointList.length > 0){
      this.drawingManagerInit = new google.maps.Polygon({
        path: this.initPointList,
        fillColor: 'red'
      });
      
      this.drawingManagerInit.setMap(map);
    }   
    const self = this;    
    this.drawingManager = new google.maps.drawing.DrawingManager(this.polygonOptionsMap);
    
    this.drawingManager.setMap(map);
    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON)    
        {
          this.selectedShape = event.overlay;
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(
              paths.getAt(p), 'set_at', () => {
                if (!event.overlay.drag) {
                  self.updatePointList(event.overlay.getPath());
                }
              }
            );
            google.maps.event.addListener(
              paths.getAt(p), 'insert_at', () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
            google.maps.event.addListener(
              paths.getAt(p), 'remove_at', () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
          }
          self.updatePointList(event.overlay.getPath());
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          
          this.drawingManagerInit.setMap(null);
          // Switch back to non-drawing mode after drawing a shape.
          this.drawingManager.setDrawingMode(null);
          // To hide:
          this.drawingManager.setOptions({
            drawingControl: false,
          });
        }
        
        this.drawingManagerInit.setMap(null);

      }
    );
  }

  deleteSelectedShape() {
    
    
    if(this.drawingManagerInit !== undefined){
      this.drawingManagerInit.setMap(null);
    }
    this.pointList = [];
    if (this.selectedShape) {
      
      this.selectedShape.setMap(null);
      this.selectedArea = 0;
      //this.pointList = [];
      // To show the controls:
      this.drawingManager.setOptions({
        drawingControl: true,
        drawingMode: "polygon" 
      });
    }
    this.apply();
  }

  updateCredentials(lat, lng){
    
    this.lat = lat;
    this.lng = lng;
    this.marker.lat = lat;
    this.marker.lng = lng;
    this.apply();

  }


  apply(){
    let model: ZoneDetails = {
      latitude: this.lat,
      longitude: this.lng,
      reduis: this.circleRadius,
      polygan: this.pointList,
      mapType: this.mapType
    };
    this.applyZone.emit(model);


  }
}


interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;  
}

interface ZoneDetails {
	latitude?: number;
	longitude?: number;
	reduis?: number;
  mapType?:string;
	polygan?: ZoneDetail[];
}
export class ZoneDetail{
  lat?: number;
	lng?: number;
  locationId?: number;
}
