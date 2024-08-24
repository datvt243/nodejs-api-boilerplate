import type { RecordObject } from './base';

export interface ResponseFormat {
    status: boolean;
    message: string;
    errors?: string[];
    data?: RecordObject | RecordObject[] | null;
}
