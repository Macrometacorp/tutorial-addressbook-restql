# Global Address Book

## 1. Overview

Demo to show a real-time adrressbook for three different regions using the saved queries/ restql functionality of c8db.


## 2.Pre-requisites

Pull latest `tutorial-addressbook-streams` code.

Update the regions of your federation in the Config file


## 3. How to Run app locally.

The federation url has to be provided in `Config.js` file. The user will then be asked to select one of the following regions in the GUI.

```js
const Config = {
    global: "demo1.demo.aws.macrometa.io",
    ashburn: "demo1-us-west-1.demo.aws.macrometa.io",
    dublin: "demo1-eu-west-1.demo.aws.macrometa.io",
    incheon: "demo1-ap-northeast-2.demo.aws.macrometa.io"
}
```

Once in the root level of the GUI (same as `package.json`), execute `npm install` if the `node_modules` folder is not present and then `npm start` to run the server locally.
Enter the tenant name, fabric name and credentials on the UI.

## 4. How to deploy app on s3

The federation url has to be provided in `Config.js` file. The user will then be asked to select one of the following regions in the GUI.

```js
const Config = {
    global: "demo1.demo.aws.macrometa.io",
    ashburn: "demo1-us-west-1.demo.aws.macrometa.io",
    dublin: "demo1-eu-west-1.demo.aws.macrometa.io",
    incheon: "demo1-ap-northeast-2.demo.aws.macrometa.io"
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

Go to `http://try.macrometa.addressbook-rest.s3-website.us-east-2.amazonaws.com/` login with your tenant, fabric and credentials and start adding contacts.
