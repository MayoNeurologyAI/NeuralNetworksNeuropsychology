import type StudyProps from '../../interfaces/studyProps'
import type MplHyperParams from '../../study/MplHyperParams';
import type MplStudyParams from '../../study/MplStudyParams';
import HiddenLayerNetwork from '../../networks/HiddenLayerNetwork';
import ff3Input from '../../../images/figure5.png';
import or1Context from '../../trainingSets/or1Context';
import xor1Context from '../../trainingSets/xor1Context';


const hyperParams: MplHyperParams = {
    mo: 0.9,
    lr: 0.6,
    randMin: -1,
    randMax: 1,
};

const study: MplStudyParams = {
    epochMax: 1000,
    errMin: 0.5,
    net: new HiddenLayerNetwork(3, 2),
    retrainingMax: 100,
    simulations: 10000,
};

const trainingSets = [or1Context(), xor1Context()];

const sp: StudyProps = {
    description: "Context is used in a feed forward network and retraining is allowed. Most networks are unable to retrain OR information, but are able to with a fair amount of retraining.",
    hyperParams: hyperParams,
    image: ff3Input,
    studyParams: study,
    title: "Study 4a: Using context during learninig in a feed forward network.",
    trainingSets: trainingSets
}

export default sp;