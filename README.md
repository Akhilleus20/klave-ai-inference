<a href="https://klave.com/">
  <img alt="Klave - Confidential AI Inference" src="https://klave.com/images/marketplace/confidential-ai.svg">
  <h1 align="center">Confidential AI Inference</h1>
</a>

<p align="center">
Exemple of Confidential AI inference with LightGBM on Klave.
</p>

![Wasm](https://img.shields.io/badge/Webassembly-5E4EE3?style=for-the-badge&labelColor=white&logo=webassembly&logoColor=5E4EE3) ![AssemblyScript](https://img.shields.io/badge/Assemblyscript-3578C7?style=for-the-badge&labelColor=white&logo=assemblyscript&logoColor=3578C7)

## Description

This contract implements a single method `getExposureRisk` that take user input, load lightGBM model, infer from user input, unload LightGBM model and return results to the user.
We use as an example the model we have created for determinating COVID contamination risk - [Paper](https://arxiv.org/pdf/2103.17096)

## Build your back-end locally

Fork the repo https://github.com/secretarium/klave-ai-inference and clone it on your machine.
You can build your template into wasm locally, allowing you to validate the hash of the application deployed on Klave.

> Note: You should have node and yarn installed to be able to build locally.

```bash
yarn install
yarn build
```

## Deploy your own back-end

You can deploy the back-end of the secure data room to Klave with one click:
[![Deploy on Klave](https://klave.com/images/deploy-on-klave.svg)](https://app.klave.com/template/github/secretarium/klave-secure-rooms)

Retrieve the address of your honest application after deployment on klave website as you will target it within the UI and the storage server.

## Try it !

After deploying the contract and allocating Credit the App, you can try to call the method `getExposureRisk` method with the following input:

```json
{
	"riskProfile": "low",
	"questionnaire": {
		"locationType": 8,
		"locationInsideOrOutside": 0,
		"numberOfPeoplePresent": 3,
		"timeSpentOnLocation": 0,
		"wearingMask": 0,
		"staffProperlyWearingPPE": 0,
		"peopleProperlyWearingPPE": 0,
		"socialDistancing": 1,
		"additionalMeasuresInPlace" : 0,
		"numberOfPeopleInTheParty": 1,
		"allMemberOfHousehold": 1,
		"allMemberOfSupportBubble": 0,
		"qualityOfTheAirflow": 3,
		"temperatureInVenue": 2,
		"humidityInVenue": 1,
		"cleanAfterEveryUsage": 3,
		"anyContactBetweenMembers": 2,
		"physicalActivity": 2,
		"exposureLedContamination": 2
	}
}
```
And you should get the following output:

```json
{
   "inferred": 0.5018788418268543,
   "riskIndex": 1,
   "contaminationStatus": "medium",
   "colour": "#fe6100",
   "visuallyImpairedColour": "#dc267f"
}
```
Don't hesitates to play with the input to infer different results.

## Authors

This library is created by [Klave](https://klave.com) and [Secretarium](https://secretarium.com) team members, with contributions from:

- Jeremie Labbe ([@jlabbeklavo](https://github.com/jlabbeKlavo)) - [Klave](https://klave.com) | [Secretarium](https://secretarium.com)
- Florian Guitton ([@fguitton](https://github.com/fguitton)) - [Klave](https://klave.com) | [Secretarium](https://secretarium.com)
- Damian Tziamtzis ([@damtzi](https://github.com/damtzi)) - [Klave](https://klave.com) | [Secretarium](https://secretarium.com)
- Etienne Bosse ([@Gosu14](https://github.com/Gosu14)) - [Klave](https://klave.com) | [Secretarium](https://secretarium.com)
