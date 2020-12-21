# Global Address Book

## 1. Overview

Demo to show a real-time adrressbook for three different regions using the saved queries/ restql functionality of c8db.
Queries that the demo uses are:-

### 1 . SaveContact

This query takes the parameters firstName, lastName and email as BindVars and inserts the provided data into the collection.

`INSERT {firstname:@firstName,lastname:@lastName,email:@email} INTO addresses`

### 2. ReadContact

This query fetches all the entries in the collection.

`FOR entry IN addresses RETURN entry`

### 3. RemoveContact

This query removes the selected entry from the collection.

`value": "REMOVE @_key IN addresses`

### 4. UpdateContact

This query takes the parameters firstName, lastName and email as BindVars and updates the provided data into the collection.

`UPDATE @_key WITH { firstname:@firstName, lastname:@lastName, email:@email} IN addresses`
> **_NOTE:_**  The App when started saves these queries, you need not create them manually.

## 2.Pre-requisites

Pull latest `tutorial-addressbook-streams` code.

Update the regions of your federation in the Config file


## 3. How to Run app locally.

The federation url has to be provided in `Config.js` file. The user will then be asked to select one of the following regions in the GUI.

```js
const Config = {
    global: "gdn1.prod.macrometa.io",
    Toronto: "gdn1-tor1.prod.macrometa.io",
    London: "gdn1-lon1.prod.macrometa.io",
    Bengaluru: "gdn1-blr1.prod.macrometa.io",
    Singapore: "gdn1-sgp1.prod.macrometa.io"
}

```

Once in the root level of the GUI (same as `package.json`), execute `npm install` if the `node_modules` folder is not present and then `npm start` to run the server locally.
Enter the tenant name, fabric name and credentials on the UI.

## 4. How to deploy app on s3

The federation url has to be provided in `Config.js` file. The user will then be asked to select one of the following regions in the GUI.

```js
const Config = {
  global: "gdn.paas.prod.macrometa.io",
  Fremont: "gdn-us-west.paas.macrometa.io",
  London: "gdn-eu-west.paas.macrometa.io",
  Mumbai: "gdn-ap-west.paas.macrometa.io",
  Singapore: "gdn-ap-south.paas.macrometa.io",
  Tokyo: "gdn-ap-northeast.paas.macrometa.io",
  Sydney: "gdn-ap-sydney.paas.macrometa.io"
}

```

Once in the root level of the GUI (same as `package.json`), execute `npm install` if the `node_modules` folder is not present and then `npm run build`. This will create an optimized production build of the application.

After it executes to completion, there will be a new folder named `build` in the root level.

The contents of this `build` folder need to be copied to the S3 bucket.

If using aws cli run `aws s3 cp build s3://<your-s3-bucket-name> --recursive` to recursively copy all files and folders inside the `build` folder to the S3 bucket.

The bucket needs to be public in order for the website to be visible.
A sample `bucket policy` is:

```js
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<your-s3-bucket-name>/*"
        }
    ]
}
```

Now goto the `Properties` tab in the aws console for this bucket and open `Static website hosting` option. In there select the option `Use this bucket to host a website` and provide `index.html` for both `Index document` and `Error document` text fields. Click on save and the website is now live!

## 5. Already deployed demo

Go to `http://addressbook-restql-gdn.s3-website-us-east-1.amazonaws.com/` login with your tenant, fabric and credentials and start adding contacts.
