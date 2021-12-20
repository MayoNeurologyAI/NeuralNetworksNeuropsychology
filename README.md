# About:

Source code for manuscript to be submitted to Neuropsychology, “Neural network process models support a distributed memory system and aid design of a novel computer adaptive digital memory test for preclinical and prodromal Alzheimer’s disease."

Released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license (CC BY-NC-SA 4.0). Copyright 2021 Mayo Foundation for Medical Education and Research.

## Github page

The github page running this code can be found [here](https://mayoneurologyai.github.io/NeuralNetworksNeuropsychology/). This page is built using the bundled javascript in the 'docs' folder.

## Local installation

To run the code locally, you will need to have [node](https://nodejs.dev/) installed.

1. install the dependencies: `npm install`
2. run the program: `npm run start`
3. open a browser and go to http://localhost:5000

The user interface was built with the [svelte](https://svelte.dev) framework.

## Code description

All code is located in the 'src' folder.

### MplLayer
To understand and evalute the models, start with the 'architecture' folder. All networks are composed of 2 or more MplLayers. MplLayers contain the code for defining weights and bias nodes, intializing, forward activation and backwards activation. 

### MplNetwork
The MPLNetwork class is an abstract class that defines how the MplLayers in the network interact. The abstract MplNetwork class is declared in the 'networks' folder. All networks, which define the layers and their interactions are also located in the 'networks' folder.

The feed forward networks used in the paper's studies use the 'HiddenLayerNetwork' class, while the mirrored cascaded networks use the 'McnNetwork' class.

### Studies
All code directly related to managing studies is in the 'study' folder. Single problem studies start with the 'singleProblemStudy' function (in the 'singleProblemStudy.ts' file) while multiple problem studies start with the 'multiProblemStudy' function (in the 'multiProblemStudy.ts file).

The specific study paramters used for each study are located in the 'defineStudies/np21' folder.

### Problem definitions
All problems are defined in the 'trainingSets' folder.
