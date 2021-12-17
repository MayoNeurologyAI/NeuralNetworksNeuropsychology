<script lang="ts">
    import { text } from "svelte/internal";

    export let epochMax: number;
    export let errorMin: number;
    export let initMin: number;
    export let initMax: number;
    export let lr: number;
    export let mo: number;
    export let simCount: number;
    export let learningRetries: number;
    export let isMultiProblem: boolean;
</script>

<div class="table-title">Study Parameters</div>
<table>
    <tr>
        <th>Number of simulations:</th>
        <td><input type="number" bind:value={simCount} /></td>
    </tr>
    <tr>
        <th>Max number of training steps per simulation:</th>
        <td><input type="number" bind:value={epochMax} /></td>
    </tr>
    <tr>
        <th>Minimum error value:</th>
        <td><input type="number" bind:value={errorMin} /></td>
    </tr>
    <tr>
        <th>Weight initialization minimum:</th>
        <td><input type="number" bind:value={initMin} /></td>
    </tr>
    <tr>
        <th>Weight initialization maximum:</th>
        <td><input type="number" bind:value={initMax} /></td>
    </tr>
    <tr>
        <th>Learning rate:</th>
        <td><input type="number" bind:value={lr} /></td>
    </tr>
    <tr>
        <th>Momentum:</th>
        <td><input type="number" bind:value={mo} /></td>
    </tr>
    {#if isMultiProblem}
        <tr>
            <th>Max learning retries:</th>
            <td><input type="number" bind:value={learningRetries} /></td>
        </tr>
    {/if}
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
    th {
        text-align: left;
    }
    th,
    td {
        padding: 5px;
        border: 1px #6a6a6a solid;
    }
</style>
