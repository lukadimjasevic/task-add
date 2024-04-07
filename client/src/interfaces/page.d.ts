declare module "taskadd/page" {
    import { ComponentType } from "svelte";
  
    export interface NavigateOptions {
        params: string;
    }

    export interface Page {
        name: string;
        path: string;
        component: ComponentType;
        protected: boolean;
        beforeNavigate: (options: NavigateOptions) => Promise<void>;
    }

    export interface RouteParams {
        [param: string]: string;
    };
}
