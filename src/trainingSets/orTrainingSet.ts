import type { TrainingData } from "./trainingSet";
import TrainingSet from "./trainingSet";

export default function orTrainingSet(): TrainingSet {
    const data: TrainingData = {
        inputs: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
        outputs: [-0.9, 0.9, 0.9, 0.9]
    }
    return new TrainingSet(data, "Or")
}