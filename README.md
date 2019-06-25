
# 1. Overview

This page is just for development purposes. **Don't use these steps to deploy the actual application.**

Demo to show custom C8Fn and real-time capabilities of C8.

# 2. Prerequisites

The following have to be present in the federation before starting the UI or else the network calls will fail crashing the app.

```js
tenant: demo
```

Login with `demo` tenant and create the following:

```js
fabric: addressbook
```

Then login with `demo` tenant, `root` and `addressbook` fabric and create the following:

```js
collection: addresses
```

The federation url has to be provided in `Config.js` file. The user will then be asked to select one of the following regions in the GUI.

```js
const Config = {
    global: "demo1.demo.aws.macrometa.io",
    ashburn: "demo1-us-west-1.demo.aws.macrometa.io",
    dublin: "demo1-eu-west-1.demo.aws.macrometa.io",
    incheon: "demo1-ap-northeast-2.demo.aws.macrometa.io"
}
```

If need arises this can be changed to have a env variable which can be provided at runtime.

```js
const Config = {
    global: process.env.REACT_APP_CLUSTER,
}
```

# 3. How to run app locally

If `node_modules` is not there, execute `npm install`.

Once all the node modules have been installed execute `npm start` to start the development server. This will start a local development server on `localhost:<some_port>`.
