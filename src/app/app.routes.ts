import { Routes } from '@angular/router'
import { LoginComponent } from './components/users/login/login.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { authGuard } from './guards/auth-guard'
import { guestGuard } from './guards/guest-guard'
import { ConsultToDoListComponent } from './components/to-do-list/consult/consult.component'

export const routes: Routes = [
    //{ path: '**', component: PageNotFoundComponent },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard]
    },
    {
        path: 'to-do-list',
        component: ConsultToDoListComponent,
        canActivate: [authGuard]
    },
]
