export interface MenuItem {
    id: number;
    title: string;
    details: string;
}

export enum SIDE_MENU_ITEMS {
    DASHBOARD = 'dashboard',
    ANALYTICS = 'analytics',
    SETTINGS = 'settings',
    ABOUT = 'about-us'
}