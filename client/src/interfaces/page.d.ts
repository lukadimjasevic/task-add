declare module "taskadd/page" {
    import { ComponentType } from "svelte";
  
    export interface Page {
        name: string;
        path: string;
        component: ComponentType;
        protected: boolean;
        beforeNavigate: () => Promise<void>;
    }
}
