import dayjs, { Dayjs } from 'dayjs';

export const RECENT_7_DAYS: [Dayjs, Dayjs] = [dayjs().subtract(7, 'day'), dayjs().subtract(1, 'day')];

export const RECENT_30_DAYS: [Dayjs, Dayjs] = [dayjs().subtract(30, 'day'), dayjs().subtract(1, 'day')];