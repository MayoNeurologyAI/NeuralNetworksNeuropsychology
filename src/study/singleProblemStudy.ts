import type MplHyperParams from "./MplHyperParams";
import type MplStudyParams from "./MplStudyParams";
import type TrainingSet from "../trainingSets/trainingSet";
import { trainSingleProblem } from "./trainSIngleProblem";
import type MplStudyEpochResult from "./MplStudyEpochResult";
import type SingleProblemStudyResult from "./SingleProblemStudyResult";
import mplStdDev from "../mathUtils/mplStdDev";
import McnNetwork from "../networks/McnNetwork";

export default function singleProblemStudy(
    hyperParams: MplHyperParams,
    trainingSet: TrainingSet,
    study: MplStudyParams,
    completeCallback: ((result: SingleProblemStudyResult) => void)
) {
    let simResults: MplStudyEpochResult[] = [];
    for (let simCount = 1; simCount <= study.simulations; simCount++) {
        study.net = study.net.generateNewNetwork()
        study.net.randomizeWeights(hyperParams.randMin, hyperParams.randMax)
        simResults.push(trainSingleProblem(hyperParams, trainingSet, study));
    }
    const studyResults = calcStudyResults(simResults, study.epochMax);
    completeCallback(studyResults)
}

function calcStudyResults(simResults: MplStudyEpochResult[], epochMax: number): SingleProblemStudyResult {
    let sum = 0;
    let numberCorrect = 0;
    let numberIncorrect = 0;
    let correctIterationsArr: number[] = [];

    for (let i = 0; i < simResults.length; i++) {
        if (simResults[i].iterations >= epochMax) {
            numberIncorrect++;
        } else {
            numberCorrect++;
            sum = sum + simResults[i].iterations;
            correctIterationsArr.push(simResults[i].iterations);
        }
    }

    const averageEpochs = sum / numberCorrect;
    const stdDev = mplStdDev(averageEpochs, correctIterationsArr);
    const percIncorrect = numberIncorrect / simResults.length;

    return {
        averageEpochs: averageEpochs,
        stdDevEpochs: stdDev,
        percIncorrect: percIncorrect
    }
}