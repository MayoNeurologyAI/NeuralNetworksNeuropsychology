<script lang="ts">
	import Home from "./components/home.svelte";
	import { routingStore } from "./routing/routingStore";
	import { RoutingLocation } from "./routing/routingLocation";
	import NpStudiesHome from "./components/NPStudiesHome.svelte";

	let routeLocation: RoutingLocation;
	routingStore.subscribe((location: RoutingLocation) => {
		routeLocation = location;
	});
</script>

{#if routeLocation === RoutingLocation.Home}
	<Home />
{:else if routeLocation === RoutingLocation.NPPaperStudies}
	<NpStudiesHome />
{/if}
