import { Routes } from '@angular/router';
import { APP_ROUTES } from './common/constants/routes.constants';
import { Dashboard } from './presentation/views/dashboard/dashboard';

export const routes: Routes = [{
    path: APP_ROUTES.HOME, component: Dashboard
}];
