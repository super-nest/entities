import { SchemaTypeOptions } from 'mongoose';

export class SuperPropOptions extends SchemaTypeOptions<any> {
    autoPopulateExclude?: boolean;
    refClass?: any;
    cms?: {
        label?: string;
        tableShow?: boolean;
        index?: boolean;
        columnPosition?: number;
    };
}

export interface Entity {
    name: string;
    schema: {
        [key: string]: SuperPropOptions;
    };
    class?: Function;
}
