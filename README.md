# test-tag-sample

## Getting Started

```sh
npm install
```

## What is tags

Tags are words enclosed in square brackets `[` and `]`, that is used to add additional information to test cases and test suites.
For example, they can convey information such as:

- `[freaky]`: freaky or not?
- `[smoke]`: a target or not for smoke testing?
- `[S]` / `[M]` / `[L]`: test size

## Running tests

### With specific tags

#### Jest

The [`--testNamePattern`](https://archive.jestjs.io/docs/en/22.x/cli#--testnamepatternregex) option is available.

```sh
$ npx jest --testNamePattern '\[smoke]'
```

#### Mocha

The [`--fgrep`](https://mochajs.org/#-fgrep-string-f-string) option is useful.

```sh
$ nyc mocha **/*.test.ts --fgrep '[smoke]'
```

#### Vitest

Same as Jest.

```sh
$ npx vitest run --testNamePattern '\[smoke]'
```

#### Node.js test runner

Use [`--test-name-pattern`](https://nodejs.org/docs/latest-v20.x/api/cli.html#--test-name-pattern).

```sh
$ node --require ts-node/register  --test-name-pattern '\[freaky]' --test **/node.test.ts
```

### Without specific tags

#### Jest

We can use [negative lookahead](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion) in regular expressions.

```sh
$ npx jest --testNamePattern '^(?!.*\\[freaky]).*$'
```

#### Mocha

We can combine `--fgrep` and [`--invert`](https://mochajs.org/#-invert).

```sh
$ npx nyc mocha **/*.test.ts --fgrep '[freaky]' --invert
```

#### Vitest

```sh
$ npx vitest run --testNamePattern '^(?!.*\[freaky]).*$'
```

#### Node.js test runner

This does not work fine. Negative lookahead is not available with `--test-name-pattern`?

```sh
$ node --require ts-node/register  --test-name-pattern '^(?!.*\[freaky]).*$' --test **/node.test.ts
```

## Appendix

### Benchmarking

```sh
$ hyperfine -w 3 "npm run jest:testWithout:freaky"
Benchmark 1: npm run jest:testWithout:freaky
  Time (mean ± σ):      3.258 s ±  0.118 s    [User: 5.346 s, System: 0.464 s]
  Range (min … max):    3.128 s …  3.483 s    10 runs

$ hyperfine -w 3 "npm run mocha:testWithout:freaky"
Benchmark 1: npm run mocha:testWithout:freaky
  Time (mean ± σ):     938.2 ms ±   9.3 ms    [User: 809.5 ms, System: 139.0 ms]
  Range (min … max):   929.6 ms … 956.9 ms    10 runs

$ hyperfine -w 3 "npm run vitest:testWithout:freaky"
Benchmark 1: npm run vitest:testWithout:freaky
  Time (mean ± σ):      1.020 s ±  0.009 s    [User: 1.146 s, System: 0.215 s]
  Range (min … max):    1.010 s …  1.039 s    10 runs

$ hyperfine -w 3 "npm run node:testWith:freaky"
Benchmark 1: npm run node:testWith:freaky
  Time (mean ± σ):      1.712 s ±  0.100 s    [User: 2.533 s, System: 0.236 s]
  Range (min … max):    1.646 s …  1.972 s    10 runs
```
