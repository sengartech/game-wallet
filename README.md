# Project Title

Game Wallet

## Description

This is a service to manage game app wallet.

Implemented in NodeJs, Express, MongoDB mainly.

## Notes

The main function to calculate wallet balance after joining contest is in file ./libs/walletLib.js

You can directly run this file using command (node ./libs/walletLib.js),
and invoke function by setting test data or uncomment line 74 to 83 to test the function.

Or I have also tried to implement the real time scenario of wallet and contest.

You can find controllers and routes files to setup, read and update wallet and contest.

There are apis, which you can use from postman app, to perfrom above tasks.

There is a route "/contest/join" in ./routes/contestRoute.js file which is for joining contest and update wallet accordingly in database.
but before this you have to create atleast one wallet and contest in database,
which you can do using respective apis.

You can change the default configuration in config.js file in configs folder.

You can also change mongodb uri to connect in config.js file, by default it is set to localhost.

## Prerequisites

NodeJs,
NPM,
MongoDB.

## Running

Note: These instructions are for Ubuntu Linux based OS.
      Assuming nodejs, npm and mongodb is already installed.

  Running project:
```
    Step 1: Clone the repository.
    Step 2: Right click in folder and select Open in Terminal.
    Step 3: Install all dependencies by using command : npm install
    Step 4: Run command to start nodejs app : npm start

```

## Built With

OS : Ubuntu 18.04 LTS (64-bit).

Editor : Visual Studio Code.

## Version

This is first version 1.0.0

## Authors

Designed and Developed by: Rishabh Singh Sengar.
