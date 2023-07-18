## Prerequisites

- **Node** is installed on the machine
- **npm** is installed on the machine

## Setup

1. Execute commands at project root:

    `npm install`
    

2. Modify `resources/config.json` file with installed browser name. Supported browsers:

    - Mozilla Firefox - "firefox"
    - Google Chrome - "chrome"

## Running tests

To run all tests, execute command at project root:

`npx jest`

To run specific tests by name, enter **-t** flag, followed by partial text name:

`npx jest -t change` - runs all tests with names that match "change"