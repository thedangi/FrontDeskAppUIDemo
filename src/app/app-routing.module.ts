import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';

import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {AppMainComponent} from './app.main.component';

import { NewcustomerComponent } from './demo/view/newcustomer.component';
import { LocationfinderComponent } from './demo/view/locationfinder.component';
import { AppLoginComponent } from './pages/app.login.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardDemoComponent},
                    {path: 'setup/customer', component: NewcustomerComponent},
                    {path: 'locations', component: LocationfinderComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent}                
                ]
            },
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
