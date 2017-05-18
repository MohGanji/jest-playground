# Jest-Playground

This repository is for figuring out the issue with `jest` not terminating when the testing suite completes successfully while using `supertest` to mock the api endpoints.

## Using this repository

```sh
git clone https://github.com/rockchalkwushock/jest-playground.git
cd jest-playground
yarn install
yarn test
```

## My System & Package Information

| Tech | Version               |
|------|-----------------------|
| node | 7.9.0                 |
| npm  | 4.5.0                 |
| yarn | 0.24.4                |
| macOS| Sierra 10.12.4        |
| jest | 20.0.3 (package.json) |

## The Problem

> `jest` never terminates upon completion of tests.

Script executing tests:

```sh
jest --config jest.config.json # nope not --watch'ing'
```

## Attempted Solutions

1. `"testEnvironment": "node"` has been set from the beginning.
2. `jest.unmock(module)` as per #997.
3. Added `afterEach()` & have tried the `afterAll()` hook for _closing_ connection to server.

> Initially I believed #3 that this was the issue. That the server connection was remaining open
> and `jest` could not close because of it. Looking at the below screenshots I don't believe that
> is the case anymore.

## Screenshots

Upon executing `yarn test` the following is seen in the console:

![After-Tests](https://github.com/rockchalkwushock/jest-playground/blob/master/imgs/console-after-tests.png)

Upon running the command:

```sh
ps | grep node
```

I see the following for the two scripts in the `package.json`:

### `yarn start`

![yarn start](https://github.com/rockchalkwushock/jest-playground/blob/master/imgs/process-yarn-start.png)

### `yarn test`

![yarn test](https://github.com/rockchalkwushock/jest-playground/blob/master/imgs/process-yarn-test.png)
