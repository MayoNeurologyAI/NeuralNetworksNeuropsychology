export default abstract class MplNetwork {
    name: string;
    description: string;

    constructor(name: string, description: string = "No description provided.") {
        this.name = name;
        this.description = description;
    }

    abstract fowardPass(input: number[]): number[];
    abstract backwardPass(expectedOuts: number[], lr: number, mo: number);
    abstract applyWeightChanges();
    abstract randomizeWeights(min: number, max: number);
    abstract generateNewNetwork(): MplNetwork;
    abstract stateToString(): string;
}