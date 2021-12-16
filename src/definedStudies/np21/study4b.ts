import type StudyProps from '../../interfaces/studyProps'
import type MplHyperParams from '../../study/MplHyperParams';
import type MplStudyParams from '../../study/MplStudyParams';
import mcn3Input from '../../../images/figure6.png';
import or1Context from '../../trainingSets/or1Context';
import xor1Context from '../../trainingSets/xor1Context';
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
    net: new McnNetwork(true, 3, 3),
    retrainingMax: 100,
    simulations: 10000,
};

const trainingSets = [or1Context(), xor1Context()];

const sp: StudyProps = {
    description: "Context is used in a MCN network and retraining is allowed. The MCN is able to retain OR after learning XOR in most cases, and can retain both problems with a small amount of retraining.",
    hyperParams: hyperParams,
    image: mcn3Input,
    studyParams: study,
    title: "Study 4b: Using context during learninig in an MCN network.",
    trainingSets: trainingSets
}

export default sp;