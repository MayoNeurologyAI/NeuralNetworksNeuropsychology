import MplLayer from "../architecture/MplLayer";
import Transform from "../mathUtils/mplTransEnum";
import type TrainingSet from "../trainingSets/trainingSet";
import MplNetwork from "./MplNetwork";

export default class HiddenLayerNetwork extends MplNetwork {
    ol: MplLayer;
    hl: MplLayer;

    inputLayerSize: number;
    hiddenLayerSize: number;

    constructor(inputLayerSize, hiddenLayerSize: number) {
        super("simple hidden")
        this.inputLayerSize = inputLayerSize;
        this.hiddenLayerSize = hiddenLayerSize;

        this.ol = new MplLayer(hiddenLayerSize, 1, Transform.htan)
        this.hl = new MplLayer(inputLayerSize, hiddenLayerSize, Transform.htan)
    }

    generateNewNetwork(): MplNetwork {
        return new HiddenLayerNetwork(this.inputLayerSize, this.hiddenLayerSize);
    }

    fowardPass(input: number[]): number[] {
        let hOut = this.hl.forward(input)
        let oOut = this.ol.forward(hOut)
        return oOut
    }

    backwardPass(expectedOuts: number[], lr: number, mo: number) {
        let outErrors = this.ol.errorsWithExpectedOuts(expectedOuts, this.ol.output)
        this.hl.errorsWithRecievingLayer(this.hl.output, this.ol, outErrors)
        let outputWc = this.ol.weightChanges(this.ol.error, this.hl.output, lr)
        let hiddenWc = this.hl.weightChanges(this.hl.error, this.hl.input, lr)
    }
    applyWeightChanges() {
        this.ol.applyWeightChanges(this.ol.lastWeightDeltas)
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
        return `OWs: ${this.ol.params.weights}, OBs: ${this.ol.params.bias}, HWs: ${this.hl.params.weights}, HBs: ${this.hl.params.bias}`
    }

}