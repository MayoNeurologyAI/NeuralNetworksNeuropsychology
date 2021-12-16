import type { TrainingData } from "./trainingSet";
import type TrainingSet from "./trainingSet";

export default class ProblemSet {
    name: string;
    trainingSets: TrainingSet[];
    constructor(name: string, trainingSets: TrainingSet[]) {
        this.trainingSets = trainingSets;
    }
}