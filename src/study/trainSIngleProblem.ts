import type MplHyperParams from "./MplHyperParams";
import type MplStudyParams from "./MplStudyParams";
import type MplStudyEpochResult from "./MplStudyEpochResult";
import type MplNetwork from "../networks/MplNetwork";
import type { TrainingData } from "../trainingSets/trainingSet"

import mplRmseError from "../mathUtils/mplRmseError";
import type TrainingSet from "../trainingSets/trainingSet";

export function netResult(net: MplNetwork, trainingData: TrainingData): MplStudyEpochResult {
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

export function trainSingleProblem(hyperParams: MplHyperParams, trainingSet: TrainingSet, study: MplStudyParams): MplStudyEpochResult {
    let data = trainingSet.randomSet();
    let dataPresCount = 0;

    // check if any training is needed, if not return the result
    let result = netResult(study.net, data)
    if (result.percCorr === 1.0 && result.rmsErr <= study.errMin) {
        result.iterations = 0;
        return result;
    }

    for (
        let epochCount = 1;
        epochCount <= study.epochMax;
        epochCount++
    ) {
        if (dataPresCount == data.inputs.length - 1) {
            data = trainingSet.randomSet();
            dataPresCount = 0;
        }

        epoch(hyperParams, study.net, data, dataPresCount);
        result = netResult(study.net, data)

        if (
            epochCount >= study.epochMax ||
            (result.percCorr === 1.0 && result.rmsErr <= study.errMin)
        ) {
            result.iterations = epochCount;
            return result;
        }
        dataPresCount++;
    }
    return result;
}

function epoch(hp: MplHyperParams, net: MplNetwork, trainingData: TrainingData, trainingIndex: number) {
    net.fowardPass(trainingData.inputs[trainingIndex])
    net.backwardPass([trainingData.outputs[trainingIndex]], hp.lr, hp.mo)
    net.applyWeightChanges()
}

