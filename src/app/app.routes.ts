import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/services/auth-guard.service';

const routes: Routes = [
    {
        path:"",
        loadChildren : () => import("./pages/main/main.module").then(m => m.MainModule)
    },
    {
        path: "login", 
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)
    },
    { 
        path: "regist", 
        loadChildren: () => import('./pages/auth/regist/regist.module').then(m => m.RegistModule) 
    },
    {
        path:"profil",
        loadChildren : () => import("./pages/profile/profile.module").then(m => m.ProfileModule),
        canActivate : [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }