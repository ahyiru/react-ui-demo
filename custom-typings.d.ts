// declare var require: any;

declare var require: {
    (path: string): any;
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

/*declare module 'classnames' {
  export default function({}): string;
}*/

declare module 'echarts-for-react' {
  export default function({}): string;
}

/*declare module "redux-form" {
    export var change: any

    export interface ReduxFormConfig {
        alwaysAsyncValidate?: boolean
    }
}*/