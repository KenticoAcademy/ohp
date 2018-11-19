import * as next from 'next';

const dev = process.env.NODE_ENV !== 'production';
export const nextApp = next({ dev });
