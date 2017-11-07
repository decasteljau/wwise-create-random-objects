# Hello Wwise - Typescript Sample
## Overview

This script creates random Wwise objects with ak.wwise.core.object.create.

This project is based on [waapi-client](https://github.com/audiokinetic/waapi-client).

## Requirements

1. [Node.js](https://nodejs.org)
1. [git](https://git-scm.com/downloads)

## Setup

It works best with Visual Studio Code. Ensure you have typescript 2.x+ installed. Run the following commands.

Install dependencies:

    npm install

Build Typescript:

    npm run build

## Execution

First, ensure WAAPI is enabled in Wwise:
 - menu **Project/Preferences**
 - Check **Enable Wwise Authoring API**
 - Click **OK**
 - Restart Wwise

Then, open a Wwise Project.

Run the following commands from the directory containing index.js, or use the built-in debugger in Visual Studio Code.

    node index.js

## The code

The code is located in [index.ts](index.ts). Have fun!