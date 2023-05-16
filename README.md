EdgeDriver
==========

An NPM wrapper for Microsofts' [EdgeDriver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/). It manages to download various (or the latest) Edgedriver versions and provides a programmatic interface to start and stop it within Node.js. __Note:__ this is a wrapper module. If you discover any bugs with EdgeDriver, please report them in the [official repository](https://github.com/MicrosoftEdge/EdgeWebDriver).

# Building and Installing

You can install this package via:

```sh
npm install edgedriver
```

Once installed you can start Edgedriver via:

```sh
npx edgedriver --port=4444
```

By default, this package downloads Edgedriver when used for the first time through the CLI or the programmatical interface. If you like to download it as part of the NPM install process, set the `EDGEDRIVER_AUTO_INSTALL` environment flag, e.g.:

```sh
EDGEDRIVER_AUTO_INSTALL=1 npm i
```

To get a list of available CLI options run `npx edgedriver --help`.

# Programmatic Interface

You can import this package with Node.js and start the driver as part of your script and use it e.g. with [WebdriverIO](https://webdriver.io):

```js
import { start } from 'edgedriver';
import { remote } from 'webdriverio';
import waitPort from 'wait-port';

/**
 * first start EdgeDriver
 */
const cp = await start({ port: 4444 });

/**
 * wait for EdgeDriver to be up
 */
await waitPort({ port: 4444 });

/**
 * then start WebdriverIO session
 */
const browser = await remote({ capabilities: { browserName: 'msedge' } });
await browser.url('https://webdriver.io');
console.log(await browser.getTitle()); // prints "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"

/**
 * kill Edgedriver process
 */
cp.kill();
```

__Note:__ as you can see in the example above this package does not wait for the driver to be up, you have to manage this yourself through packages like [`wait-on`](https://github.com/jeffbski/wait-on).

## Options

The `start` method offers the following options to be passed on to the actual Edgedriver CLI.

### edgeDriverVersion

The version of EdgeDriver to start. See https://msedgedriver.azureedge.net/ for all available versions, platforms and architecture.

Type: `number`<br />
Default: `latest`

### port
The port on which the driver should run.

Example: `9515`<br >
Type: `number`

### adbPort
The port on which the ADB driver should run.

Example: `9515`<br >
Type: `number`

### baseUrl
Base URL path prefix for commands, e.g. `wd/url`.

Example: `/`

Type: `string`

### logPath
Write server log to file instead of stderr, increases log level to `INFO`

Type: `string`

### logLevel
Set log level. Possible options `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Type: `string`

### verbose
Log verbosely (equivalent to `--log-level=ALL`)

Type: `boolean`

### silent
Log nothing (equivalent to `--log-level=OFF`)

Type: `boolean`

### appendLog
Append log file instead of rewriting.

Type: `boolean`

### replayable
Log verbosely and don't truncate long strings so that the log can be replayed (experimental).

Type: `boolean`

### readableTimestamp
Add readable timestamps to log.

Type: `boolean`

### enableChromeLogs
Show logs from the browser (overrides other logging options).

Type: `boolean`

### bidiMapperPath
Custom bidi mapper path.

Type: `string`

### allowedIps
Comma-separated allowlist of remote IP addresses which are allowed to connect to EdgeDriver.

Type: `string[]`

### allowedOrigins
Comma-separated allowlist of request origins which are allowed to connect to EdgeDriver. Using `*` to allow any host origin is dangerous!

Type: `string[]`

---

For more information on WebdriverIO see the [homepage](https://webdriver.io).
