import { Routes } from '@angular/router';
import { APP_ROUTES } from './common/constants/routes.constants';
import { Dashboard } from './presentation/views/dashboard/dashboard';
import { Landing } from './presentation/views/landing/landing';
import { NotFound } from './presentation/views/not-found/not-found';

export const routes: Routes = [
    {
        path: APP_ROUTES.LANDING_PAGE, component: Landing
    },
    {
        path: APP_ROUTES.HOME, component: Dashboard
    },
    { 
        path: '**', component: NotFound 
    }
];
