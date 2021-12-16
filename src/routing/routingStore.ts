import { writable } from "svelte/store";
import { RoutingLocation } from "./routingLocation";

export const routingStore = writable(RoutingLocation.NPPaperStudies)