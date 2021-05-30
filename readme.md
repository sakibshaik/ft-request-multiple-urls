## ft request multiple urls

Fetches an array of URLs which contain JSON data and returns their contents in a promise

### Setup
clone the repo (havent published it as an npm package)



##### Example:

###### run:

`node example.js`

###### code sample:

`
const urls = [
'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
];

requestMultipleUrls(urls)
.then(console.log)
.catch(console.log)
`

###### Test:

`npm run test`