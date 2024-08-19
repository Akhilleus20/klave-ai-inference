import { JSON } from '@klave/sdk';

@serializable
export class ErrorMessage {
    success!: boolean;
    message!: string;
}

@serializable
export class InferenceInput {
    riskProfile!: string;
    questionnaire!: Questionnaire;
}

@serializable
class Questionnaire
{
    locationType!: i32;
    locationInsideOrOutside!: i32;
    numberOfPeoplePresent!: i32;
    timeSpentOnLocation!: i32;
    wearingMask!: i32;
    staffProperlyWearingPPE!: i32;
    peopleProperlyWearingPPE!: i32;
    socialDistancing!: i32;
    additionalMeasuresInPlace!: i32;
    numberOfPeopleInTheParty!: i32;
    allMemberOfHousehold!: i32;
    allMemberOfSupportBubble!: i32;
    qualityOfTheAirflow!: i32;
    temperatureInVenue!: i32;
    humidityInVenue!: i32;
    cleanAfterEveryUsage!: i32;
    anyContactBetweenMembers!: i32;
    physicalActivity!: i32;
    exposureLedContamination!: i32;
}

@serializable
export class InferenceOutput {
    inferred!: number;
    riskIndex!: u8;
    contaminationStatus!: string;
    colour!: string;
    visuallyImpairedColour!: string;
}
