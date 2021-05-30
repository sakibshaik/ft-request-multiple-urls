const chai = require('chai')
const nock = require('nock')
const requestMultipleUrls = require("../index")

const expect = chai.expect

describe("e2e test for requestMultipleUrls", ()=> {
    
    it("fetch results for given urls (all resolves to 200 OK)", (done)=> {
        const requestNock1 = nock('https://www.aws.com')
            .get('/json-users')
            .reply(200, {
                key: '12313-2222',
                name: 'requestMultipleUrls',
                hash: 'asiodja-alasldas-awe'
            })

        const requestNock2 =nock('https://www.aws.com')
            .get('/json-accounts.json')
            .reply(200, {
                key: '12313-2222',
                name: 'requestMultipleUrls',
                hash: 'asiodja-alasldas-awe'
            })

        const requestNock3 =nock('https://www.aws.com')
            .get('/json-profiles.json')
            .reply(200, {
                key: '12313-2222',
                name: 'requestMultipleUrls',
                hash: 'asiodja-alasldas-awe'
            })
        const url = [
            "https://www.aws.com/json-users", "https://www.aws.com/json-accounts.json", "https://www.aws.com/json-profiles.json"
        ]
        requestMultipleUrls(url)
            .then((result) => {
                expect(result.length).to.equal(3)
                done()
            }).catch((err)=> {done(err)})
    })

    it("fetch results for given urls  (2 resolves to 200 OK, 1 returns 404)", (done)=> {
        const requestNock1 = nock('https://www.aws.com')
            .get('/json-users')
            .reply(200, {
                key: '12313-2222',
                name: 'requestMultipleUrls',
                hash: 'asiodja-alasldas-awe'
            })

        const requestNock2 =nock('https://www.aws.com')
            .get('/json-accounts.json')
            .reply(200, {
                key: '12313-2222',
                name: 'requestMultipleUrls',
                hash: 'asiodja-alasldas-awe'
            })

        const requestNock3 =nock('https://www.aws.com')
            .get('/json-profiles.json')
            .reply(404, {})
        const url = [
            "https://www.aws.com/json-users", "https://www.aws.com/json-accounts.json", "https://www.aws.com/json-profiles.json"
        ]
        requestMultipleUrls(url)
            .then((result) => {
                expect(result.length).to.equal(2)
                done()
            }).catch((err)=> {done(err)})
    })
})