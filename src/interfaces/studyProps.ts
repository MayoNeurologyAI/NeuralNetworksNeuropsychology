import type MplHyperParams from "../study/MplHyperParams";
import type MplStudyParams from "../study/MplStudyParams";
import type TrainingSet from "../trainingSets/trainingSet";

export default interface StudyProps {
    description: string;
    hyperParams: MplHyperParams;
    image: string;
    studyParams: MplStudyParams;
    title: string;
    trainingSets: TrainingSet[];
}