import type MultiProblemResult from "./MultiProblemResults";
import type MultiProblemProcessedResults from "./MultiProblemProcessedResults";
import mplStdDev from "../mathUtils/mplStdDev";
import mplAvg from "../mathUtils/mpAvg";
import type TrainingSet from "../trainingSets/trainingSet";

export default function processMultiProblemResults(maxRetrainsAllowed: number, trainingSets: TrainingSet[], results: MultiProblemResult[]): MultiProblemProcessedResults {
    let initialFailCount = 0;
    let failedToRetrainCount = 0;
    let initialLearningEpochs = 0;
    let initialLearningEpochsArray: number[] = [];
    let initialLearningEpochsPerProblemArray: number[][] = [];
    let retryEpochsArray: number[] = [];
    let simCount = results.length;
    let retryCountArray: number[] = [];
    let failedToRetainInitiallyCount = 0;

    let names: string[] = [];
    trainingSets.forEach((ts) => {
        names.push(ts.name)
    })

    trainingSets.forEach(_ => initialLearningEpochsPerProblemArray.push([]))

    results.forEach(r => {
        if (r.failedToLearnInitially) {
            initialFailCount++;
        } else {
            let epochs = 0;
            r.initialTraining.forEach((it, index) => {
                epochs += it.iterations;
                initialLearningEpochsPerProblemArray[index].push(it.iterations)
            })
            initialLearningEpochs += epochs;
            initialLearningEpochsArray.push(epochs);
        }

        if (!r.failedToLearnInitially && r.failedToRetrain) {
            failedToRetrainCount++;
        }

        if (!r.failedToLearnInitially && !r.failedToRetrain && r.retryCount > 0) {
            failedToRetainInitiallyCount++;
            retryCountArray.push(r.retryCount);

            let iterations = 0;
            r.retries.forEach(problemRetry => {
                problemRetry.forEach(training => {
                    iterations += training.iterations
                })
            })
            retryEpochsArray.push(iterations);
        }
    });

    let avgInitialLearniningEpochs = initialLearningEpochs / initialLearningEpochsArray.length
    let avgRtryCount = mplAvg(retryCountArray);
    let avgRetrainingEpochs = mplAvg(retryEpochsArray)

    let avgInitForEachProblem: number[] = [];
    let stdInitForEachProblem: number[] = [];

    initialLearningEpochsPerProblemArray.forEach(epochsArr => {
        const avg = mplAvg(epochsArr);
        avgInitForEachProblem.push(avg);

        const std = mplStdDev(avg, epochsArr);
        stdInitForEachProblem.push(std);
    });

    let totalEpochsArray: number[] = [];
    initialLearningEpochsArray.forEach((initialEpochs, index) => {
        let epochs = initialEpochs;
        if (index < retryEpochsArray.length) {
            epochs += retryEpochsArray[index]
        }
        totalEpochsArray.push(epochs)
    })

    const avgTotalEpochs = mplAvg(totalEpochsArray)


    return {
        avgInitialTrainingEpochs: avgInitialLearniningEpochs,
        stdInitialTrainingEpochs: mplStdDev(avgInitialLearniningEpochs, initialLearningEpochsArray),
        avgTotalSuccessfulEpochs: avgTotalEpochs,
        stdTotalSuccessfulEpochs: mplStdDev(avgTotalEpochs, totalEpochsArray),
        avgInitialEpochsForEachProblem: avgInitForEachProblem,
        stdInitialEpochsForEachProblem: stdInitForEachProblem,
        simCount: simCount,
        avgRetryCount: avgRtryCount,
        stdRetryCount: mplStdDev(avgRtryCount, retryCountArray),
        maxRetrainsAllowed: maxRetrainsAllowed,
        failedToLearnInitiallyCount: initialFailCount,
        percFailedToLearnInitially: initialFailCount / simCount,
        problemNames: names,
        failedToRetainInitiallyCount: failedToRetainInitiallyCount,
        failedToRetrainCount: failedToRetrainCount,
        percFailedToRetrain: failedToRetrainCount / (simCount - initialFailCount),
        avgRetrainingEpochs: avgRetrainingEpochs,
        stdRetraningEpochs: mplStdDev(avgRetrainingEpochs, retryEpochsArray)
    }
}