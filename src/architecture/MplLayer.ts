import type MplParms from './MplParams'
import type Transform from '../mathUtils/mplTransEnum'
import mplRandom from '../mathUtils/mplRandom'
import mplTransform from '../mathUtils/mplTransform'
import mplDrvTransform from '../mathUtils/mplDrvTransform'

export default class MplLayer {
    name: string = "incognito"
    connectedTo: MplLayer
    isWeightSetting: boolean
    params: MplParms
    transform: Transform
    input: number[] = []
    error: number[] = []
    output: number[] = []
    lastWeightDeltas: MplParms
    lastWeightChanges: MplParms
    inputLength: number
    outputLength: number
    useBias: boolean

    constructor(
        inputs: number,
        outputs: number,
        transform: Transform,
        useBias: boolean = true) {
        this.transform = transform
        this.inputLength = inputs
        this.outputLength = outputs
        this.useBias = useBias
        this.resetLayer()
    }

    resetLayer() {
        this.lastWeightDeltas = undefined;
        this.lastWeightChanges = undefined;

        this.params = {
            bias: [],
            weights: []
        }
        for (let i = 0; i < this.outputLength; i++) {
            if (this.useBias) {
                this.params.bias.push(0);
            }
            this.params.weights[i] = []
            for (let j = 0; j < this.inputLength; j++) {
                this.params.weights[i].push(0)
            }
        }
    }

    forward(inputs: number[]): number[] {
        let outputs: number[] = []
        for (let i = 0; i < this.params.weights.length; i++) {
            outputs.push(0)
        }

        for (let i = 0; i < this.params.bias.length; i++) {
            outputs[i] += this.params.bias[i]
        }

        for (let outputIndex = 0; outputIndex < this.params.weights.length; outputIndex++) {
            for (let inputIndex = 0; inputIndex < this.params.weights[outputIndex].length; inputIndex++) {
                outputs[outputIndex] += this.params.weights[outputIndex][inputIndex] * inputs[inputIndex]
            }
        }

        for (let i = 0; i < this.params.weights.length; i++) {
            outputs[i] = mplTransform(outputs[i], this.transform)
        }
        this.input = inputs;
        this.output = outputs;
        return outputs
    }

    errorsWithExpectedOuts(expectedOuts: number[], outputs: number[]): number[] {
        let errors: number[] = []
        for (let i = 0; i < outputs.length; i++) {
            let d = mplDrvTransform(outputs[i], this.transform)
            let diff = expectedOuts[i] - outputs[i]
            errors.push(diff * d)
        }
        this.error = errors;
        return errors;
    }

    errorsWithRecievingLayer(outputs: number[], recLayer: MplLayer, recErrors: number[]): number[] {
        let errors: number[] = []
        for (let i = 0; i < this.params.weights.length; i++) {
            errors.push(0)
        }

        for (let outputIndex = 0; outputIndex < this.params.weights.length; outputIndex++) {
            for (let recIndex = 0; recIndex < recLayer.params.weights.length; recIndex++) {
                errors[outputIndex] += recErrors[recIndex] * recLayer.params.weights[recIndex][outputIndex]
            }
        }

        for (let i = 0; i < outputs.length; i++) {
            errors[i] = mplDrvTransform(outputs[i], this.transform) * errors[i];
        }
        this.error = errors;
        return errors
    }

    weightChanges(errors: number[], sendingOutputs: number[], lr: number = 1, mo: number = 0): MplParms {
        let p = {
            bias: [],
            weights: []
        }

        for (let i = 0; i < this.params.bias.length; i++) {
            if (mo !== 0 && this.lastWeightDeltas !== undefined) {
                p.bias.push(this.lastWeightDeltas.bias[i] * mo)
            } else {
                p.bias.push(0)
            }
        }

        for (let i = 0; i < this.params.weights.length; i++) {
            p.weights[i] = []
            for (let j = 0; j < this.params.weights[i].length; j++) {
                if (mo !== 0 && this.lastWeightDeltas !== undefined) {
                    p.weights[i].push(this.lastWeightDeltas.weights[i][j] * mo)
                } else {
                    p.weights[i].push(0)
                }
            }
        }

        for (let bIndex = 0; bIndex < this.params.bias.length; bIndex++) {
            p.bias[bIndex] += errors[bIndex] * lr
        }

        for (let outputIndex = 0; outputIndex < errors.length; outputIndex++) {

            for (let inputIndex = 0; inputIndex < this.params.weights[outputIndex].length; inputIndex++) {
                p.weights[outputIndex][inputIndex] += errors[outputIndex] * sendingOutputs[inputIndex] * lr
            }
        }
        this.lastWeightDeltas = p;
        return p
    }

    applyWeightChanges(deltas: MplParms) {
        for (let i = 0; i < this.params.bias.length; i++) {
            this.params.bias[i] += deltas.bias[i]
        }
        for (let i = 0; i < this.params.weights.length; i++) {
            for (let j = 0; j < this.params.weights[i].length; j++)
                this.params.weights[i][j] += deltas.weights[i][j]
        }
        this.lastWeightChanges = deltas
    }

    randomizeParams(min: number, max: number) {
        for (let i = 0; i < this.params.bias.length; i++) {
            this.params.bias[i] = mplRandom(min, max)
        }
        for (let i = 0; i < this.params.weights.length; i++) {
            for (let j = 0; j < this.params.weights[i].length; j++) {
                this.params.weights[i][j] = mplRandom(min, max)
            }
        }
    }
}