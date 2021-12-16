import MplLayer from "../architecture/MplLayer";
import type MplParams from "../architecture/MplParams";
import Transform from "../mathUtils/mplTransEnum";
import MplNetwork from "./MplNetwork";

export default class SimpleOrNetwork extends MplNetwork {
    layer: MplLayer
    input: number[] = []
    output: number[] = []
    outputError: number[] = []
    outputWC: MplParams

    constructor() {
        super("simple logic network")
        this.layer = new MplLayer(2, 1, Transform.logsig)
    }

    generateNewNetwork(): MplNetwork {
        return new SimpleOrNetwork();
    }

    fowardPass(input: number[]): number[] {
        this.input = input
        this.output = this.layer.forward(input)
        return this.output
    }

    backwardPass(expectedOuts: number[], lr: number, mo: number) {
        this.outputError = this.layer.errorsWithExpectedOuts(expectedOuts, this.output)
        this.outputWC = this.layer.weightChanges(this.outputError, this.input, lr, mo)
    }

    applyWeightChanges() {
        this.layer.applyWeightChanges(this.outputWC)
    }

    randomizeWeights(min: number, max: number) {
        this.layer.randomizeParams(min, max)
    }

    stateToString() {
        return `input ${this.input}; output: ${this.output}; OE: ${this.outputError}, OWC: ${this.outputWC.weights}`
    }
}
