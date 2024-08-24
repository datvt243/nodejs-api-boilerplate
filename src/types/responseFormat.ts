/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import type { RecordObject } from './base';

export interface ResponseFormat {
    status: boolean;
    message: string;
    errors?: string[];
    data?: RecordObject | RecordObject[] | null;
}
