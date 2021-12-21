<script lang="ts">
    import type SingleProblemStudyResult from "../study/SingleProblemStudyResult";
    export let results: SingleProblemStudyResult;
</script>

<div class="table-title">Results:</div>
<table>
    <tr>
        <th>Avg. Training Steps (SD)</th>
        <th>% Incorrect</th>
    </tr>
    <tr>
        <td
            >{results.averageEpochs.toFixed(2)} ({results.stdDevEpochs.toFixed(
                2
            )})</td
        >
        <td>{results.percIncorrect.toFixed(2)}</td>
    </tr>
</table>

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
