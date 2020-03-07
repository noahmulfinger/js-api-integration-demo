import { Component, OnInit } from '@angular/core';
import { UserSession } from '@esri/arcgis-rest-auth';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    try {
      UserSession.completeOAuth2({
        clientId: "Dbtn71QaBs736dRr",
        redirectUri: `${window.location.origin}/authenticate`
      });
    } catch (e) {
      console.error(e);
    }
  }

}
