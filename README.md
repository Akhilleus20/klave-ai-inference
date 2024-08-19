<a href="https://klave.com/">
  <img alt="Klave - Secure Data Rooms" src="https://klave.com/images/marketplace/secure-data-rooms.svg">
  <h1 align="center">Confidential AI Inference</h1>
</a>

<p align="center">
Exemple of Confidential AI inference with LightGBM on Klave.
</p>

![Wasm](https://img.shields.io/badge/Webassembly-5E4EE3?style=for-the-badge&labelColor=white&logo=webassembly&logoColor=5E4EE3) ![AssemblyScript](https://img.shields.io/badge/Assemblyscript-3578C7?style=for-the-badge&labelColor=white&logo=assemblyscript&logoColor=3578C7)

## Description

This contract implements a single method "getExposureRisk" that take user input, load lightGBM model, infer from user input, unload LightGBM model and return results to the user.
We use as an example the model we have created for determinating COVID contamination risk - [![Paper]](https://app.klave.com/template/github/secretarium/klave-secure-rooms](https://arxiv.org/pdf/2103.17096))

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

## Authors

This library is created by [Klave](https://klave.com) and [Secretarium](https://secretarium.com) team members, with contributions from:

- Jeremie Labbe ([@jlabbeklavo](https://github.com/jlabbeKlavo)) - [Klave](https://klave.com) | [Secretarium](https://secretarium.com)
- Florian Guitton ([@fguitton](https://github.com/fguitton)) - [Klave](https://klave.com) | [Secretarium](https://secretarium.com)
- Damian Tziamtzis ([@damtzi](https://github.com/damtzi)) - [Klave](https://klave.com) | [Secretarium](https://secretarium.com)
- Etienne Bosse ([@Gosu14](https://github.com/Gosu14)) - [Klave](https://klave.com) | [Secretarium](https://secretarium.com)
