/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description:
 */

import type { ResponseFormat } from '@/types';

export const convertTime = (time: string | number) => {
    if (typeof time === 'string') {
        return new Date(time);
    }
    return new Date(time);
};

export const convertReturn = (val: ResponseFormat): ResponseFormat => {
    const { status = false, message = '', errors = [], data = null } = val;
    return {
        status,
        message,
        errors,
        data,
    };
};
