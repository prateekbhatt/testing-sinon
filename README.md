testing-sinon
=============

Trying out the sinon.js library for spies and stubs

## Getting Started
Clone the repo with:

```
git clone git@github.com:prateekbhatt/testing-sinon.git
```

Download the dependencies with:

```
cd testing-sinon
npm install
```

## Run Tests

Try out running the tests with:

```
grunt test
```

## Output

```
Running "mochaTest:test" (mochaTest) task

  spy
    ✓ should work
    ✓ calls the original function
    ✓ calls the original function only once
    ✓ calls the original function with the right this and args

  stub
    ✓ returns the return value from the original function

  testing GET request to Google using stub
    ✓ makes a get request to getData, stubs getData
    ✓ stubs the "request" library to return dummy result


  7 passing (17ms)

Done, without errors.
```

## License
Copyright (c) 2014 Prateek Bhatt. Licensed under the MIT license.
