import { TaskProgress } from '../../../../../types/TaskProgress';

/**
 * Socket.io progress for remote text generation
 *
 * This is sent from server to client arbitrarily and may be sent multiple times
 */
export interface Ptps_Progress {
    /**
     * The progress of text generation
     */
    readonly taskProgress: TaskProgress;
}
