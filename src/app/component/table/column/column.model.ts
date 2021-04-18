import { ColumnType } from "./column-type.enum";

export class Column {
    name: string;
    type: ColumnType; 
    header?: string;
    conditional?: string;
    dateFormat?: string;
    skipTranslate?: boolean;
}
