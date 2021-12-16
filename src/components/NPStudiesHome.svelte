<script lang="ts">
    import studies from "../definedStudies/np21/studyArr";
    import StudyDisplay from "./StudyDisplay.svelte";
    import { routingStore } from "../routing/routingStore";
    import { RoutingLocation } from "../routing/routingLocation";

    let activeStudyIndex = -1;

    function homeClick() {
        routingStore.set(RoutingLocation.Home);
    }

    function githubClick() {
        window.location.href =
            "https://github.com/MayoNeurologyAI/NeuralNetworksNeuropsychology";
    }
</script>

<div class="content">
    <div class="subtitle">Studies for the research publication:</div>
    <div class="articleTitle">
        "Neural network process simulations support a distributed memory system
        and aid design of a novel computer adaptive digital memory test for
        preclinical and prodromal Alzheimer’s disease" (in preparation)
    </div>
    {#each studies as studyProps, index}
        <div class="study">
            <StudyDisplay
                {studyProps}
                otherStudyRunning={activeStudyIndex != index &&
                    activeStudyIndex != -1}
                on:running={() => (activeStudyIndex = index)}
                on:stopped={() => (activeStudyIndex = -1)}
            />
        </div>
    {/each}
    <div class="navigation">
        <button class="navButton" on:click={homeClick}>Return Home</button>
        <button class="navButton" on:click={githubClick}>
            Source Code on Github
        </button>
    </div>
</div>

<style>
    .content {
        align-items: center;
        height: 100%;
        overflow-x: hidden;
    }
    .articleTitle {
        font-size: 1.2rem;
        width: 800px;
        max-width: 98%;
        color: #e6e6e6;
        margin: 10px;
    }
    .study {
        width: 800px;
        max-width: 98%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .navigation {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
    }
    .navButton {
        margin-bottom: 10px;
        width: 200px;
    }
</style>
