import type StudyProps from '../../interfaces/studyProps'
import type MplHyperParams from '../../study/MplHyperParams';
import type MplStudyParams from '../../study/MplStudyParams';
import xorTrainingSet from '../../trainingSets/xorTrainingSet';
import McnNetwork from '../../networks/McnNetwork';
import simpleMcn from '../../../images/figure2.png';

const hyperParams: MplHyperParams = {
    mo: 0.9,
    lr: 0.6,
    randMin: -0.1,
    randMax: 0.1,
};

const study: MplStudyParams = {
    epochMax: 1000,
    errMin: 0.5,
    net: new McnNetwork(false, 2, 2),
    retrainingMax: 0,
    simulations: 10000,
};

const trainingSet = xorTrainingSet();

const sp: StudyProps = {
    description: "A Mirrored Cascaded Network (MCN) that can solve XOR consistently and efficiently.",
    hyperParams: hyperParams,
    image: simpleMcn,
    studyParams: study,
    title: "Study 2: Addressing inefficiency and inconsistency with cascaded networks",
    trainingSets: [trainingSet]
}

export default sp;