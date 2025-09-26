/**
 * Global application routes.
 *
 * This constant object centralizes all application routes to ensure consistency
 * and make refactoring easier. The `as const` assertion makes the properties
 * readonly and preserves their literal values, providing type safety.
 *
 * @example
 * ```typescript
 * import { APP_ROUTES } from './constants';
 *
 * // Programmatic navigation
 * this.router.navigate([APP_ROUTES.HOME]);
 *
 * // Template usage
 * <a [routerLink]="APP_ROUTES.HOME">Home</a>
 * ```
 */
export const APP_ROUTES = {
    LANDING_PAGE: '',
    HOME: 'home/:page',
    HOME_WITHOUT_PARAM :'home',
    NOT_FOUND_PAGE: 'not-found'
} as const;