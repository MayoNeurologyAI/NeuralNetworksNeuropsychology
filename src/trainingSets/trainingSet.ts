import mplShuffleArray from "../mathUtils/mplShuffleArray";

export interface TrainingData {
    inputs: number[][]
    outputs: number[]
}

export default class TrainingSet {
    name: string
    data: TrainingData

    constructor(data: TrainingData, name: string = "") {
        this.data = data;
        this.name = name;
    }

    randomSet(): TrainingData {
        let ixs: number[] = []
        for (let i = 0; i < this.data.outputs.length; i++) {
            ixs[i] = i;
        }
        ixs = mplShuffleArray(ixs)
        let shuffledData: TrainingData = { inputs: [], outputs: [] }
        for (let i = 0; i < this.data.outputs.length; i++) {
            shuffledData.inputs[i] = this.data.inputs[ixs[i]]
            shuffledData.outputs[i] = this.data.outputs[ixs[i]]
        }
        return shuffledData
    }
}