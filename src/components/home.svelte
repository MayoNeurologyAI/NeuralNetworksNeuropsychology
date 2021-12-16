<script lang="ts">
    import mapleIcon from "../../images/icon.png";
    import { RoutingLocation } from "../routing/routingLocation";
    import { routingStore } from "../routing/routingStore";

    function studiesButtonClicked() {
        routingStore.set(RoutingLocation.NPPaperStudies);
    }

    function githubButtonClicked() {
        window.location.href =
            "https://github.com/MayoNeurologyAI/NeuralNetworksNeuropsychology";
    }
</script>

<div class="content">
    <img
        class="image"
        src={mapleIcon}
        alt="the maple leaf is used as the icon for the maple program"
    />
    <div class="title">MAPLE</div>
    <div class="subtitle">
        A process model simulator for exploring cascaded architectures.
    </div>
    <div class="separator" />
    <button class="selectionButton" on:click={studiesButtonClicked}>
        Studies for Neuropsychology Paper
    </button>
    <div class="separator" />
    <button class="selectionButton" on:click={githubButtonClicked}>
        Source code available on github
    </button>
</div>

<style>
    .image {
        height: 200px;
    }
    .separator {
        height: 1%;
    }
    .content {
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .selectionButton {
        width: 300px;
    }
</style>
