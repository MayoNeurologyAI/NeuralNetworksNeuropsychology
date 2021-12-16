import type MplNetwork from "../networks/MplNetwork";

export default interface MplStudyParams {
    epochMax: number;
    errMin: number;
    net: MplNetwork;
    retrainingMax: number;
    simulations: number;
}