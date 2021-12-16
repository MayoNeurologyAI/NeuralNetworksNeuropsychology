import MplLayer from "../architecture/MplLayer";
import Transform from "../mathUtils/mplTransEnum";
import MplNetwork from "./MplNetwork";

export default class Pollacks extends MplNetwork {
    ctxl: MplLayer
    fxl: MplLayer

    constructor() {
        super("pollacks network")
        this.ctxl = new MplLayer(1, 2, Transform.linear)
        this.fxl = new MplLayer(1, 1, Transform.logsig)
    }

    generateNewNetwork(): MplNetwork {
        return new Pollacks();
    }

    fowardPass(input: number[]): number[] {
        let ctxOutput = this.ctxl.forward([input[0]])
        this.fxl.params.weights[0][0] = ctxOutput[0]
        this.fxl.params.bias[0] = ctxOutput[1]
        return this.fxl.forward([input[1]])
    }
    backwardPass(expectedOuts: number[], lr: number, mo: number) {
        let outErrors = this.fxl.errorsWithExpectedOuts(expectedOuts, this.fxl.output)
        this.ctxl.error = [outErrors[0] * this.fxl.input[0], outErrors[0]]
        this.ctxl.weightChanges(this.ctxl.error, this.ctxl.input, lr, mo)
    }
    applyWeightChanges() {
        this.ctxl.applyWeightChanges(this.ctxl.lastWeightDeltas)
    }

    randomizeWeights(min: number, max: number) {
        this.ctxl.randomizeParams(min, max)
    }

    stateToString(): string {
        return `ctxl weights: ${this.ctxl.params.weights} ctxl bias: ${this.ctxl.params.bias}`
    }

}