import MplLayer from "../architecture/MplLayer";
import Transform from "../mathUtils/mplTransEnum";
import MplNetwork from "./MplNetwork";

export default class McnNetwork extends MplNetwork {
    ol: MplLayer
    hl: MplLayer

    bias: boolean;
    inputs: number;
    hiddens: number;

    constructor(bias: boolean, inputs: number, hiddens: number) {
        super("simple MCN")
        this.bias = bias;
        this.inputs = inputs;
        this.hiddens = hiddens;

        this.ol = new MplLayer(inputs, 1, Transform.htan, false)
        this.hl = new MplLayer(inputs, hiddens, Transform.htan, bias)
    }


    generateNewNetwork(): MplNetwork {
        return new McnNetwork(this.bias, this.inputs, this.hiddens);
    }



    fowardPass(input: number[]): number[] {
        let hlOutput = this.hl.forward(input)

        this.ol.params.weights[0] = hlOutput;
        this.hl.input = input
        return this.ol.forward(input)
    }

    backwardPass(expectedOuts: number[], lr: number, mo: number) {
        let outErrors = this.ol.errorsWithExpectedOuts(expectedOuts, this.ol.output)
        let hidErrors: number[] = []

        for (let i = 0; i < this.ol.input.length; i++) {
            hidErrors.push(outErrors[0] * this.ol.input[i])
        }

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

    stateToString(): string {
        return `HWs: ${this.hl.params.weights}, HBs: ${this.hl.params.bias}`
    }

}