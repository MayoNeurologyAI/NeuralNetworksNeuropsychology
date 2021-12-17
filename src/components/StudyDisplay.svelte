<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type StudyProps from "../interfaces/studyProps";
    import singleProblemStudy from "../study/singleProblemStudy";
    import type SingleProblemStudyResult from "../study/SingleProblemStudyResult";
    import multiProblemStudy from "../study/multiProblemStudy";
    import SingleProblemDisplay from "./SingleProblemDisplay.svelte";

    import type MultiProblemProcessedResults from "../study/MultiProblemProcessedResults";
    import MultipleProblemDisplay from "./MultipleProblemDisplay.svelte";
    import ParameterDisplay from "./ParameterDisplay.svelte";

    export let studyProps: StudyProps;
    export let otherStudyRunning: boolean;

    const dispatch = createEventDispatcher();

    let studyRunning = false;
    let singleProblemStudyResults: SingleProblemStudyResult;
    let multipleProblemStudyResults: MultiProblemProcessedResults;

    function runStudy() {
        studyRunning = true;
        dispatch("running");

        setTimeout(() => {
            if (studyProps.trainingSets.length === 1) {
                singleProblemStudy(
                    studyProps.hyperParams,
                    studyProps.trainingSets[0],
                    studyProps.studyParams,
                    singleProblemCompleteCallback
                );
            } else if (studyProps.trainingSets.length > 1) {
                multiProblemStudy(
                    studyProps.hyperParams,
                    studyProps.trainingSets,
                    studyProps.studyParams,
                    multipleProblemCompleteCallback
                );
            }
        }, 1);
    }
    function stopStudy() {
        studyRunning = false;
        dispatch("stopped");
    }

    function singleProblemCompleteCallback(
        studyResults: SingleProblemStudyResult
    ) {
        stopStudy();
        singleProblemStudyResults = studyResults;
    }

    function multipleProblemCompleteCallback(
        studyResults: MultiProblemProcessedResults
    ) {
        stopStudy();
        multipleProblemStudyResults = studyResults;
    }
</script>

<div class="content">
    <div class="study">
        <div class="studyTitle">
            {studyProps.title}
        </div>
        <div class="studyDetails">
            <div class="imageContainer">
                <img
                    class="studyImage"
                    src={studyProps.image}
                    alt="Network architecture"
                />
            </div>
            <div class="studyDescription">
                {studyProps.description}
                <ParameterDisplay
                    bind:epochMax={studyProps.studyParams.epochMax}
                    bind:errorMin={studyProps.studyParams.errMin}
                    bind:initMin={studyProps.hyperParams.randMin}
                    bind:initMax={studyProps.hyperParams.randMax}
                    bind:lr={studyProps.hyperParams.lr}
                    bind:mo={studyProps.hyperParams.mo}
                    bind:simCount={studyProps.studyParams.simulations}
                    bind:learningRetries={studyProps.studyParams.retrainingMax}
                    isMultiProblem={studyProps.trainingSets.length > 1 &&
                        studyProps.studyParams.retrainingMax > 0}
                />
                {#if singleProblemStudyResults}
                    <SingleProblemDisplay results={singleProblemStudyResults} />
                {:else if multipleProblemStudyResults}
                    <MultipleProblemDisplay
                        results={multipleProblemStudyResults}
                    />
                {/if}
                <p>
                    {#if !studyRunning && !otherStudyRunning}
                        <button on:click={runStudy}>Run Study</button>
                    {:else}
                        <button disabled={true}>Running...</button>
                    {/if}
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    button {
        margin: 10px;
        width: 130px;
    }
    .study {
        border-bottom-color: #008080;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        width: 800px;
        max-width: 98%;
    }
    .content {
        align-items: center;
        display: flex;
        height: 100%;
        width: 100%;
    }
    .studyDetails {
        margin-top: 10px;
        width: 800px;
        max-width: 90%;
        display: flex;
        flex-direction: column;
    }
    .studyDescription {
        color: #e6e6e6;
    }
    .imageContainer {
        align-self: flex-end;
        padding: 10px;
        background-color: #000000;
        max-width: min(90%, 620px);
        max-height: 620px;
        width: auto;
        height: auto;
    }
    .studyImage {
        max-width: min(90%, 600px);
        max-height: 600px;
        width: auto;
        height: auto;
    }
</style>
