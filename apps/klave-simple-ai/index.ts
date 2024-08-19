import { Notifier, ML } from '@klave/sdk';
import { InferenceInput, InferenceOutput, ErrorMessage } from './types';
import { model } from './model';

/**
 * @transaction
 */
export function getExposureRisk(input : InferenceInput): void {
    
    //Validate input
    if (!input.riskProfile) {
        Notifier.sendJson<ErrorMessage>({
            success: false,
            message: `Missing riskProfile argument`
        });
    }

    if(input.riskProfile.toLowerCase() != "low" && input.riskProfile.toLowerCase() != "medium" && input.riskProfile.toLowerCase() != "high")
    {
        Notifier.sendJson<ErrorMessage>({
            success: false,
            message: `Invalid riskProfile argument`
        });
    }

    if (!input.questionnaire) {
        Notifier.sendJson<ErrorMessage>({
            success: false,
            message: `Missing data argument`
        });
    }
    
    let inputDataForInference = new Float64Array(19);
    inputDataForInference[0] = input.questionnaire.locationType;
    inputDataForInference[1] = input.questionnaire.locationInsideOrOutside;
    inputDataForInference[2] = input.questionnaire.numberOfPeoplePresent;
    inputDataForInference[3] = input.questionnaire.timeSpentOnLocation;
    inputDataForInference[4] = input.questionnaire.wearingMask;
    inputDataForInference[5] = input.questionnaire.staffProperlyWearingPPE;
    inputDataForInference[6] = input.questionnaire.peopleProperlyWearingPPE;
    inputDataForInference[7] = input.questionnaire.socialDistancing;
    inputDataForInference[8] = input.questionnaire.additionalMeasuresInPlace;
    inputDataForInference[9] = input.questionnaire.numberOfPeopleInTheParty;
    inputDataForInference[10] = input.questionnaire.allMemberOfHousehold;
    inputDataForInference[11] = input.questionnaire.allMemberOfSupportBubble;
    inputDataForInference[12] = input.questionnaire.qualityOfTheAirflow;
    inputDataForInference[13] = input.questionnaire.temperatureInVenue;
    inputDataForInference[14] = input.questionnaire.humidityInVenue;
    inputDataForInference[15] = input.questionnaire.cleanAfterEveryUsage;
    inputDataForInference[16] = input.questionnaire.anyContactBetweenMembers;
    inputDataForInference[17] = input.questionnaire.physicalActivity;
    inputDataForInference[18] = input.questionnaire.exposureLedContamination;
    
    //Loading model
    let load = ML.loadLightGBMModel("exposure_risk", model.toString());
    if (load !== 0) {
        Notifier.sendJson<ErrorMessage>({
            success: false,
            message: `Error at loading model`
        });
    }

    //infer from model
    let result = ML.inferLightGBMModel("exposure_risk", inputDataForInference);

    if (result.length === 0) {
        Notifier.sendJson<ErrorMessage>({
            success: false,
            message: `Error at infering model`
        });
    }

    let risk = result[0];

    //Unload model
    let unload  = ML.unloadLightGBMModel("exposure_risk");
    if (unload !== 0) {
        Notifier.sendJson<ErrorMessage>({
            success: false,
            message: `Error at unloading model`
        });
    }

    //extract risk index from risk profile and risk value
    let index: u8 = input.riskProfile.toLowerCase() == "low" ? (risk < 0.4 ? 0 : risk < 0.6 ? 1 : risk < 0.8 ? 2 : 3) :
    input.riskProfile.toLowerCase() == "medium" ? (risk < 0.3 ? 0 : risk < 0.5 ? 1 : risk < 0.7 ? 2 : 3) :
    risk < 0.2 ? 0 : risk < 0.4 ? 1 : risk < 0.6 ? 2 : 3;

    // Compute colour code and contamination status
    let colours = ["#86ab50", "#fe6100", "#d7230e", "#a11708"];
    let colours_impaired = ["#648fff", "#dc267f","#fe6100", "#ffb000"];
    let contamination = ["low", "medium", "high", "very high"];
    
    let colour = colours[index];
    let colour_impaired = colours_impaired[index];
    let contaminationStatus = contamination[index];

    Notifier.sendJson<InferenceOutput>({
        inferred: risk,
        riskIndex: index,
        contaminationStatus: contaminationStatus,
        colour: colour,
        visuallyImpairedColour: colour_impaired
    });
}
