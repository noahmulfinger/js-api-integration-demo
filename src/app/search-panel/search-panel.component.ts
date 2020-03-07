import { Component, OnInit } from "@angular/core";
import { UserSession } from "@esri/arcgis-rest-auth";
import { searchItems, SearchQueryBuilder, IItem } from "@esri/arcgis-rest-portal";
import { SessionService } from "../session.service";
import { ItemService } from '../item.service';

@Component({
  selector: "app-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.scss"]
})
export class SearchPanelComponent implements OnInit {
  session: UserSession;
  items: IItem[];

  constructor(private sessionService: SessionService, private itemService :ItemService) {}

  ngOnInit(): void {
    this.sessionService.session$.subscribe(session => {
      this.session = session;
      if (session) {
        const q = new SearchQueryBuilder()
          .match("Feature Service")
          .in("type")
          .and()
          .match(session.username)
          .in("owner");
        searchItems({ q, authentication: session }).then(response => {
          this.items = response.results;
        });
      }
    });

    this.itemService.item$.subscribe(item => {
    })
  }

  signIn() {
    this.sessionService.signIn();
  }

  addItemToMap(item: IItem) {
    this.itemService.item = item;
  }
}
