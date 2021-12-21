<script lang="ts">
    import type MultiProblemProcessedResults from "../study/MultiProblemProcessedResults";
    export let results: MultiProblemProcessedResults;
</script>

{#if results.maxRetrainsAllowed === 0}
    <div class="table-title">Results:</div>
    <table>
        <tr>
            {#each results.problemNames as name, index}
                <th>Avg Training Steps to initially learn {name} (SD):</th>
            {/each}
            <th>Percent learning all problems:</th>
            <th>Percent retaining {results.problemNames[0]}</th>
        </tr>

        {#each results.problemNames as name, index}
            <td>
                {results.avgInitialEpochsForEachProblem[index].toFixed(2)}
                ({results.stdInitialEpochsForEachProblem[index].toFixed(2)})
            </td>
        {/each}
        <td>{(1 - results.percFailedToLearnInitially).toFixed(4)}</td>
        <td
            >{(results.failedToRetainInitiallyCount / results.simCount).toFixed(
                2
            )}</td
        >
    </table>
{:else}
    <div class="table-title">Initial learning:</div>
    <table>
        <tr>
            <th>Percent learning both problems:</th>
            <th>Avg total training steps (SD):</th>
            <th>Percent failed to retain OR:</th>
        </tr>
        <tr>
            <td>{(1 - results.percFailedToLearnInitially).toFixed(4)}</td>
            <td
                >{results.avgInitialTrainingEpochs.toFixed(2)}
                ({results.stdInitialTrainingEpochs.toFixed(2)})</td
            >
            <td
                >{(
                    results.failedToRetainInitiallyCount / results.simCount
                ).toFixed(4)}</td
            >
        </tr>
    </table>
    <div class="table-title">
        Retraining (of models that could learn both problems but did not retain
        the first):
    </div>
    <table>
        <tr>
            <th>Percent able to learn both problems with retraining</th>
            <th
                >Avg problem representations to successfully learn both problems
                (SD)</th
            >
            <th
                >Avg total additional training steps needed for successful
                retraining (SD):</th
            >
        </tr>
        <tr>
            <td>{(1 - results.percFailedToRetrain).toFixed(4)}</td>
            <td>
                {results.avgRetryCount.toFixed(2)}
                ({results.stdRetryCount.toFixed(2)})</td
            >
            <td>
                {results.avgRetrainingEpochs.toFixed(2)}
                ({results.stdRetraningEpochs.toFixed(2)})</td
            >
        </tr>
    </table>
{/if}

<style>
    .table-title {
        margin-top: 10px;
        color: #008080;
    }
    table {
        margin-top: 10px;
        border-collapse: collapse;
        border: 1px #6a6a6a solid;
    }
    th,
    td {
        padding: 5px;
        border: 1px #6a6a6a solid;
    }
</style>
