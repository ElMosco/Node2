import { Component, OnInit } from '@angular/core';
import { GeoFeatureCollection } from './models/geojson.model';

import { Marker } from "./models/marker.model";
import { Ci_vettore } from "./models/ci_vett.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ang-maps';

  zoom : number = 12;
  geoJsonObject: GeoFeatureCollection;
  fillColor: string = "#FF0000";
  obsGeoData: Observable<GeoFeatureCollection>;
  lng: number = 9.205331366401035;
  lat: number = 45.45227445505016;

  obsCiVett : Observable<Ci_vettore[]>
  markers : Marker[];


  constructor(public http: HttpClient){

  }

  prepareData = (data: GeoFeatureCollection) => {
    this.geoJsonObject = data
    console.log(this.geoJsonObject);
  }

  prepareCiVettData = (data: Ci_vettore[]) =>
  {
    console.log(data);
    this.markers = [];
    for (const iterator of data){
      let m = new Marker(iterator.WGS84_X, iterator.WGS84_Y, iterator.CI_VETTORE);
      this.markers.push(m);
    }
  }



  styleFunc = (feauture) => {
    return ({
      clickable: false,
      fillColor: this.fillColor,
      strokeWeight: 1
    });
  }

  ngOnInit() {
    this.obsGeoData = this.http.get<GeoFeatureCollection>("https://3000-b74d7957-385a-4e83-b884-e1bb05d56783.ws-eu01.gitpod.io/");
    this.obsGeoData.subscribe(this.prepareData);

    this.obsCiVett = this.http.get<Ci_vettore[]>("https://3000-b74d7957-385a-4e83-b884-e1bb05d56783.ws-eu01.gitpod.io/ci_vettore/${foglio}");
    this.obsCiVett.subscribe(this.prepareCiVettData);
  }

}
