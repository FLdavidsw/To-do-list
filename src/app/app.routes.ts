import { NgModule } from '@angular/core';
import { RouterModule ,Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutUserComponent } from '@components/layout-user/layout-user.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from '@components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path:'',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    },
    {
        path: 'user',
        component: LayoutUserComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ]
    }
];
