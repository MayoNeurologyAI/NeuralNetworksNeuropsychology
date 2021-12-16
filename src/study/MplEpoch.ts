import type MplStudyEpochResult from "./MplStudyEpochResult";
import type { TrainingData } from "../trainingSets/trainingSet"
import type MplHyperParams from "./MplHyperParams";
import type MplNetwork from "../networks/MplNetwork";
import mplRmseError from "../mathUtils/mplRmseError";

export default function epoch(hp: MplHyperParams, net: MplNetwork, trainingData: TrainingData, trainingIndex: number): MplStudyEpochResult {
    net.fowardPass(trainingData.inputs[trainingIndex])
    net.backwardPass([trainingData.outputs[trainingIndex]], hp.lr, hp.mo)
    net.applyWeightChanges()

    let corr = 0;
    let outputs: number[] = [];
    for (let i = 0; i < trainingData.inputs.length; i++) {
        let out = net.fowardPass(trainingData.inputs[i]);
        let roundedOut = Math.round(out[0])
        if (roundedOut - trainingData.outputs[i] <= 0.1) {
            corr += 1;
        }
        outputs.push(out[0]);
    }
    let rmsError = mplRmseError(trainingData.outputs, outputs);
    let percCorr = corr / trainingData.outputs.length;

    return {
        rmsErr: rmsError,
        percCorr: percCorr,
        iterations: 0
    }
}