import type MplStudyEpochResult from "./MplStudyEpochResult";

export default interface MultiProblemResult {
    initialTraining: MplStudyEpochResult[];
    retries: MplStudyEpochResult[][];
    retryCount: number;
    failedToLearnInitially: boolean;
    failedToRetrain: boolean;
}