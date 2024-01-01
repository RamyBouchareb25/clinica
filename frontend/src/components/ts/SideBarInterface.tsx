export interface SideBarInterface {
    title: string;
    path: string;
    icon: JSX.Element;
    iconClosed: JSX.Element;
    iconOpened : JSX.Element;
    subNav: SideBarInterface[];
}