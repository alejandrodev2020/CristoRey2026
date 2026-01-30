import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { UserTmp } from './userModel';
import { roleCode } from 'app/modules/auth/models/plan-professional/role-code';
import { rolesAdmin } from 'app/modules/auth/models/plan-professional/admin-roles';
import { rolesSeller } from 'app/modules/auth/models/plan-professional/seller-roles';
import { rolesCounter } from 'app/modules/auth/models/plan-professional/counter-roles';
import { imageUser } from 'app/shared/models/image-user-default.const';
import { environment } from 'environments/enviroments';
import { rolesAssistant } from 'app/modules/auth/models/plan-professional/assistant-roles';

@Component({
    selector     : 'classy-layout',
    templateUrl  : './classy.component.html',
    // styles: './',
    styleUrls:['./style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;


    logoClient = environment.logo;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    )
    {
        this.user = UserTmp;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        let user = localStorage.getItem('userLogged');
        let role = localStorage.getItem('role');
        let token = localStorage.getItem('token');

        let userJson = JSON.parse(user); 
        let roleJson = JSON.parse(role); 
        this.user.avatar = (userJson.avatar)? 'data:image/avif;base64,'+ userJson?.avatar : imageUser;
        this.user.id = userJson.id;
        this.user.name = userJson?.firstName + ' ' + userJson?.lastName;
        debugger;
        // this.user.email = userJson?.userName;
        this.user.email = roleJson?.name;

        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe ((navigation: Navigation) => {
               this.navigation = navigation;
               switch (roleJson.id) {
                   case roleCode.admin:
                          this.navigation.default = rolesAdmin;
                       break;
                   case roleCode.doctor:
                          this.navigation.default = rolesSeller;
                       break;
                   case roleCode.patient:
                           this.navigation.default = rolesCounter;
                       break;     
                   default:
                       break;
               }
            });

        // Subscribe to the user service
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
