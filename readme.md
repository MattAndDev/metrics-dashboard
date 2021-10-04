# metrics dashboard

Small setup to observe local cpu and memory usage.

Allows to create warning and alerts if a given threshold is surpassed.

## get it running

requirements: node LTS, best viewed in chrome

1. install dependencies: `npm i`
2. build and run: `npm run bundle:run`
3. visit [localhost:4242](http://localhost:4242)
4. enjoy some metrics 🍿

### stack and setup

this small application is based on [my personal boilerplate](https://github.com/MattAndDev/micro-pwa) and is built with PWA and performance in mind.

The stack: node, typescript, preact, webpack, css-modules, express, jest and more

## implementation details

this application offers observability for two metrics `cpu load` and `memory usage`

### cpu data accuracy

instead of using [os.loadavg()](https://nodejs.org/api/os.html#os_os_loadavg) which **always** provides average over at least the last minute, this implementation calculates the precise load given a _sample time_ in milliseconds.

This is achieved by using [os.cpus()](https://nodejs.org/api/os.html#os_os_cpus) twice with _sample time_ interval, and averaging the two values

### sampling customization

in the application sample time as well as total observed (stored) time can be adjusted individually for each metric

### monitoring

each metric allows one monitor to be set with two levels: _warn_ and _alert_

each setting consists of the threshold value and the minimal duration this threshold needs to be surpassed for the monitor to be active

### data persistence

persistence layer is **extremely simple** and could be heavily improved upon

simple usage of local storage with cleanup upon application initialization of present data

### no library policy

this application uses no library for: data management, chart design, ui components.

this is a deliberate choice, based on a couple of principles:

- for such a small scope, most (all?) libraries are an overhead
- it's fun to build svg yourself (in your free time)
- I love to overengineer (**in my freetime**)

**The complete app only sends 28kb over the wire**

## tests

not much 😭 but the monitor provider is tested as per requirements

run `npm test` to see the output
