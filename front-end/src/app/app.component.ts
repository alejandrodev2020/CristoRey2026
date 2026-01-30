import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { environment } from 'environments/enviroments';


@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    tileName = environment.nameStore;
    /**
     * Constructor
     */
    constructor(private titleService:Title)
    {
        this.titleService.setTitle(this.tileName);
    }
}
