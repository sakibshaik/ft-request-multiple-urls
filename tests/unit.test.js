const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))
const sinon = require('sinon')

const request = require("../request")

const requestMultipleUrls = require("../index")

describe('validate requestMultipleUrls', () => {
    let requestStub
    beforeEach(() => {
        requestStub = sinon.stub(request, 'asyncRequest').callsFake((options) => new Promise((resolve, reject) => {
            // eslint-disable-next-line prefer-promise-reject-errors
            const status = options.hostname === 'iwillfail.com' ? reject({ statusCode: 404 }) : resolve({ statusCode: 200, body:{some: "data", goes: "here"}})
            resolve({ statusCode: status })
        }))
    })

    afterEach(() => {
        requestStub.restore()
    })
    it('check if input is array', async() => {
        const url = 'some string'
        await expect(requestMultipleUrls(url)).to.eventually.be.rejectedWith("invalid urls")
    })
    it('check if input is not an empty array', async () => {
        const url = []
        await expect(requestMultipleUrls(url)).to.eventually.be.rejectedWith("invalid urls")
    })
    it('check if every string in input is URL', async() => {
        const url = ["http://some.url.com", "non-url-string"]
        await expect(requestMultipleUrls(url)).to.eventually.be.rejectedWith("invalid urls")
    })
    it('array should have all valid urls', (done) => {
        // const url = ["http://some.url.com", "http://some.otherurl.com", "http://some.otherurl.co.uk"]
        const url = [
            "http://some.url.com", "http://some.url.com/test.ext"
        ]
        requestMultipleUrls(url)
            .then(done()).catch((err)=> {done(err)})
    })
    it('array should have all valid urls', (done) => {
        // const url = ["http://some.url.com", "http://some.otherurl.com", "http://some.otherurl.co.uk"]
        const url = [
            "http://some.url.com", "http://some.url.com/test.ext"
        ]
        requestMultipleUrls(url)
            .then(done()).catch((err)=> {done(err)})
    })
    it('should return only one value if one url not found', (done) => {
        // const url = ["http://some.url.com", "http://some.otherurl.com", "http://some.otherurl.co.uk"]
        const url = [
            "http://some.url.com", "https://iwillfail.com"
        ]
        requestMultipleUrls(url)
            .then((result) => {
                expect(Array.isArray(result)).to.equal(true)
                expect(result.length).to.equal(1)
                done()
            }).catch((err)=> {done(err)})
    })


    it('should return all repsonses', (done) => {
        const url = [
            "http://some.url.com", "http://some.url.co.uk/sd.json", "http://some.url.com/json.json"
        ]
        requestMultipleUrls(url)
            .then((result) => {
                expect(Array.isArray(result)).to.equal(true)
                expect(result.length).to.equal(3)
                done()
            }).catch((err)=> {done(err)})
    })
})