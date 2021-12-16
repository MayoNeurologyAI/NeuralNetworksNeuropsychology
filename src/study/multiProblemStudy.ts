import type MplHyperParams from "./MplHyperParams";
import type MplNetwork from "../networks/MplNetwork";
import type MplStudyParams from "./MplStudyParams";
import type MultiProblemResult from "./MultiProblemResults"
import type TrainingSet from "../trainingSets/trainingSet";
import { trainSingleProblem, netResult } from "./trainSIngleProblem";
import processMultiProblemResults from "./processMultiProblemResults";
import type MultiProblemProcessedResults from "./MultiProblemProcessedResults";

export default function multiProblemStudy(
    hyperParams: MplHyperParams,
    trainingSets: TrainingSet[],
    study: MplStudyParams,
    finishedCallback: ((MultiProblemProcessedResults) => void)
) {
    let results: MultiProblemResult[] = [];
    for (let i = 0; i < study.simulations; i++) {
        results.push(runSimulation(hyperParams, trainingSets, study));
    }
    let processedResults = processMultiProblemResults(study.retrainingMax, trainingSets, results);
    finishedCallback(processedResults);
}

function runSimulation(
    hyperParams: MplHyperParams,
    trainingSets: TrainingSet[],
    study: MplStudyParams): MultiProblemResult {

    let result: MultiProblemResult = {
        initialTraining: [],
        retries: [],
        retryCount: 0,
        failedToLearnInitially: false,
        failedToRetrain: false
    }
    study.net = study.net.generateNewNetwork();
    study.net.randomizeWeights(hyperParams.randMin, hyperParams.randMax);

    // initial pass at problems
    for (let i = 0; i < trainingSets.length; i++) {
        let trainingResult = trainSingleProblem(hyperParams, trainingSets[i], study);
        result.initialTraining.push(trainingResult);
        if (trainingResult.iterations === study.epochMax) {
            result.failedToLearnInitially = true;
            return result;
        }
    }

    // initialize retries
    result.retries = [];
    trainingSets.forEach(element => {
        result.retries.push([]);
    });

    let problemRepCount = 0;
    while (problemRepCount < study.retrainingMax) {
        if (allProblemsLearned(study.errMin, study.net, trainingSets)) {
            result.retryCount = problemRepCount;
            return result;
        }

        for (let i = 0; i < trainingSets.length; i++) {
            problemRepCount++;
            let trainingResult = trainSingleProblem(hyperParams, trainingSets[i], study);
            result.retries[i].push(trainingResult);
            if (allProblemsLearned(study.errMin, study.net, trainingSets)) {
                result.retryCount = problemRepCount;
                return result;
            }
        }
    }
    result.retryCount = problemRepCount;

    // if no retraining is allowed, then processMultiProblemResults would incorrectly label all networks as retaining
    // the first problem
    if (study.retrainingMax > 0) {
        result.failedToRetrain = true;
    } else {
        result.failedToRetrain = false;
    }
    return result;
}

function allProblemsLearned(errMin: number, net: MplNetwork, trainingSets: TrainingSet[]): boolean {
    for (let i = 0; i < trainingSets.length; i++) {
        let result = netResult(net, trainingSets[i].data)
        if (result.percCorr !== 1.0 || result.rmsErr > errMin) {
            return false
        }
    }
    return true;
}