import type { TrainingData } from "./trainingSet";
import TrainingSet from "./trainingSet";

export default function xor1Context(): TrainingSet {
    const data: TrainingData = {
        inputs: [[1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1]],
        outputs: [-0.9, 0.9, 0.9, -0.9]
    }
    return new TrainingSet(data, "Xor 1Ctx")
}