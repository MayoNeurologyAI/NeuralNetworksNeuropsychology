import type StudyProps from '../../interfaces/studyProps'
import type MplHyperParams from '../../study/MplHyperParams';
import type MplStudyParams from '../../study/MplStudyParams';
import HiddenLayerNetwork from '../../networks/HiddenLayerNetwork';
import xorTrainingSet from '../../trainingSets/xorTrainingSet';
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

const trainingSet = xorTrainingSet();

const sp: StudyProps = {
    description: "A feedforward network that can solve exclusive-or (XOR), but not consistently.",
    hyperParams: hyperParams,
    image: ffxor,
    studyParams: study,
    title: "Study 1: Introducing feed-forward networks, illustrating inefficiency and inconsistency.",
    trainingSets: [trainingSet]
}

export default sp;