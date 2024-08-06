import {DefineComponent} from 'vue';

export default interface MenuModel {
    id: string;
    name: string;
    children?: MenuModel[];
    icon?: DefineComponent<any, any, any>;
    activeIcon?: DefineComponent<any, any, any>;
    path?: string;
}
