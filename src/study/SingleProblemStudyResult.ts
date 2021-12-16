import type MplStudyEpochResult from "./MplStudyEpochResult";

export default interface SingleProblemStudyResult {
    averageEpochs: number;
    stdDevEpochs: number;
    percIncorrect: number;
}