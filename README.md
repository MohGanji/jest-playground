# Jest-Playground :white_check_mark: **Solved** :white_check_mark:

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

## The Solution

As per discussion with [@cpojer](https://github.com/cpojer) in [#3602](https://github.com/facebook/jest/issues/3602) the issue was not enough was being done in the `afterEach()` hook. The _connection_ to `MongoDB` was remaining open because I was only _dropping connection_ to the _collection_ not the entire database.

The [StackO post](http://stackoverflow.com/questions/44036189/jest-not-terminating-after-tests-complete-successfully) has been answered similarly as well.

```js
afterEach(async () => {
    try {
      const { todos } = mongoose.connection.collections;
      // Collection is being dropped.
      await todos.drop()
      // Connection to Mongo killed.
      await mongoose.disconnect();
      // Server connection closed.
      await server.close();
    } catch (error) {
      console.log(`
        You did something wrong dummy!
        ${error}
      `);
      throw error;
    }
  });
```
