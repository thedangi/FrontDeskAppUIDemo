import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <a id="footerlogolink">
                Storage Box Demo
            </a>
            
        </div>
    `
})
export class AppFooterComponent {

    constructor(public app: AppComponent) {}


}
