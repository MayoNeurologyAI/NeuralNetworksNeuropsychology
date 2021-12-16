import type StudyProps from '../../interfaces/studyProps'
import type MplHyperParams from '../../study/MplHyperParams';
import type MplStudyParams from '../../study/MplStudyParams';
import HiddenLayerNetwork from '../../networks/HiddenLayerNetwork';
import xorTrainingSet from '../../trainingSets/xorTrainingSet';
import orTrainingSet from '../../trainingSets/orTrainingSet';
import ffxor from '../../../images/figure1.png';


const hyperParams: MplHyperParams = {
    mo: 0.9,
    lr: 0.6,
    randMin: -1,
    randMax: 1,
};

const study: MplStudyParams = {
    epochMax: 1000,
    errMin: 0.5,
    net: new HiddenLayerNetwork(2, 2),
    retrainingMax: 0,
    simulations: 10000,
};

const trainingSets = [orTrainingSet(), xorTrainingSet()];

const sp: StudyProps = {
    description: "After learning OR, then XOR, the Feed Forward network loses its knowledge of OR.",
    hyperParams: hyperParams,
    image: ffxor,
    studyParams: study,
    title: "Study 3a: Demonstrating catastrophic interference in a feed foward network.",
    trainingSets: trainingSets
}

export default sp;