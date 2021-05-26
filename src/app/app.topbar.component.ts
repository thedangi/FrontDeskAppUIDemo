import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-wrapper">
                

                <div class="layout-topbar-right">
                    <a class="menu-button" href="#" (click)="appMain.onMenuButtonClick($event)">
                        <i class="pi pi-bars"></i>
                    </a>

                    <ul class="layout-topbar-actions">
                        <li #searchItem class="search-item topbar-item" [ngClass]="{'active-topmenuitem': appMain.search}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,searchItem)">
                                <span class="topbar-icon">
                                    <i class="pi pi-search"></i>
                                </span>
                            </a>

                            

                            <ul class="fadeInDown">
                                <div class="search-input-wrapper p-fluid">
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search"></i>
                                        <input type="text" pInputText placeholder="Search..." (click)="appMain.searchClick = true;"/>
                                    </span>
                                </div>
                            </ul>
                        </li>
                        <li #notifications class="topbar-item notifications"
                            [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === notifications}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,notifications)">
                                <span class="p-overlay-badge topbar-icon">
                                    <i class="pi pi-bell" pBadge value="1"></i>
                                </span>
                            </a>
                            <ul class="fadeInDown">
                                <li class="layout-submenu-header">
                                    <h6 class="header-text">Notifications</h6>
                                    <span class="p-badge">1</span>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-shopping-cart"></i>
                                        <div class="notifications-item">
                                            <h6>Storage <span>#123</span> is available</h6>
                                            <span>Total Amount of <span>$34.50</span></span>
                                        </div>
                                    </a>
                                </li>
                                
                            </ul>
                        </li>
                        
                        
                        <li #profile class="topbar-item user-profile"
                            [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === profile}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,profile)">
                                <img class="profile-image" src="assets/layout/images/avatar-profile.png" alt="demo">
                                <div class="profile-info">
                                    <h6>Demo App</h6>
                                    <span>Admin</span>
                                </div>
                            </a>

                            <ul class="fadeInDown">
                                <li class="layout-submenu-header">
                                    <img class="profile-image" src="assets/layout/images/avatar-profile.png" alt="demo">
                                    <div class="profile-info">
                                        <h6>Demo App</h6>
                                        <span>Admin</span>
                                    </div>
                                </li>
                                
                                <li role="menuitem">
                                    <a (click)="login()">
                                        <i class="pi pi-power-off"></i>
                                        <h6>Logout</h6>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    `
})
export class AppTopBarComponent {

    constructor(public appMain: AppMainComponent, public app: AppComponent, private router: Router) {
    }


    login(){
        console.log("Test");
        this.router.navigate(['login']);
    }

}
