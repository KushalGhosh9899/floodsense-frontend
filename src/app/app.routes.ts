import { Routes } from '@angular/router';
import { APP_ROUTES } from './common/constants/routes.constants';
import { Dashboard } from './presentation/views/dashboard/dashboard';
import { Landing } from './presentation/views/landing/landing';

export const routes: Routes = [
    {
        path: APP_ROUTES.LANDING_PAGE, component: Landing
    }
];
