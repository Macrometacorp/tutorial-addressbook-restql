# Global Address Book - RestQL

### Live Demo: https://macrometacorp.github.io/tutorial-addressbook-restql/

Demo to show a Real-time adrress book!

## Setup

| **Federation**                                        | **Email**          | **Passsword** |
| ----------------------------------------------------- | ------------------ | ------------- |
| [Global Data Network](https://gdn.paas.macrometa.io/) | demo@macrometa.com | `xxxxxxxx`    |

## Overview

**Dashboard:**

![dashboard.png](dashboard.png)

### Macrometa Account setup

1. On the development machine, run the following commands in a console:

```
1. git clone git@github.com:Macrometacorp/tutorial-addressbook-restql.git
2. cd tutorial-addressbook-restql
3. git fetch
4. npm install
5. npm run start
```

2. Rename `.env.sample` to `.env` and update the `REACT_APP_GDN_URL` with `https://gdn.paas.macrometa.io`

3. Once you have the app running, you will be presented with a page to log in with your Macrometa account. Add your Macrometa account email and password and the user will then be asked to select one region in the GUI.

4. Deploy on GH Pages:

```
npm run deploy
```
