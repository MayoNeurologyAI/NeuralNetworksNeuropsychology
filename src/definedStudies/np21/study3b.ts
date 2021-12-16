import type StudyProps from '../../interfaces/studyProps'
import type MplHyperParams from '../../study/MplHyperParams';
import type MplStudyParams from '../../study/MplStudyParams';
import xorTrainingSet from '../../trainingSets/xorTrainingSet';
import orTrainingSet from '../../trainingSets/orTrainingSet';
import mcnWithBias from '../../../images/figure4.png';
import McnNetwork from '../../networks/McnNetwork';


const hyperParams: MplHyperParams = {
    mo: 0.9,
    lr: 0.6,
    randMin: -0.1,
    randMax: 0.1,
};

const study: MplStudyParams = {
    epochMax: 1000,
    errMin: 0.5,
    net: new McnNetwork(true, 2, 2),
    retrainingMax: 0,
    simulations: 10000,
};

const trainingSets = [orTrainingSet(), xorTrainingSet()];

const sp: StudyProps = {
    description: "After learning OR, then XOR, the MCN loses its knowledge of OR.",
    hyperParams: hyperParams,
    image: mcnWithBias,
    studyParams: study,
    title: "Study 3b: Demonstrating catastrophic interference in a MCN network.",
    trainingSets: trainingSets
}

export default sp;