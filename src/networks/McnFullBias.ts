import MplLayer from "../architecture/MplLayer";
import Transform from "../mathUtils/mplTransEnum";
import MplNetwork from "./MplNetwork";

export default class McnFullBias extends MplNetwork {
    ol: MplLayer
    hl: MplLayer

    inputs: number;
    hidden: number;

    constructor(inputs: number, hidden: number) {
        super("simple MCN full bias")
        this.inputs = inputs;
        this.hidden = hidden;

        this.ol = new MplLayer(inputs, 1, Transform.htan)
        this.hl = new MplLayer(inputs, hidden, Transform.htan)
    }

    generateNewNetwork(): MplNetwork {
        return new McnFullBias(this.inputs, this.hidden);
    }

    fowardPass(input: number[]): number[] {
        let hlOutput = this.hl.forward(input)
        for (let i = 0; i < this.ol.output.length - 1; i++) {
            this.ol.params.weights[0][i] = hlOutput[i];
        }

        this.ol.params.bias[0] = hlOutput[this.hl.output.length - 1];

        this.hl.input = input
        return this.ol.forward(input)
    }

    backwardPass(expectedOuts: number[], lr: number, mo: number) {
        let outErrors = this.ol.errorsWithExpectedOuts(expectedOuts, this.ol.output)
        let hidErrors: number[] = []

        for (let i = 0; i < this.ol.output.length - 1; i++) {
            hidErrors.push(outErrors[0] * this.ol.input[i])
        }
        hidErrors.push(outErrors[0])

        this.hl.error = hidErrors;
        this.hl.weightChanges(this.hl.error, this.ol.input, lr, mo)
    }

    applyWeightChanges() {
        this.hl.applyWeightChanges(this.hl.lastWeightDeltas)
    }

    randomizeWeights(min: number, max: number) {
        this.hl.randomizeParams(min, max)
        this.ol.randomizeParams(min, max)
    }

    resetNetwork() {
        this.hl.resetLayer;
        this.ol.resetLayer;
    }


    stateToString(): string {
        return `HWs: ${this.hl.params.weights}, HBs: ${this.hl.params.bias}`
    }

}