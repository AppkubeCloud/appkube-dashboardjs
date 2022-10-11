import { CorsWorker as Worker } from 'core/utils/CorsWorker';

export const createWorker = () => new Worker(new URL('./layout.worker.js', import.meta.url));
