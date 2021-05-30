const https = require('https')

const request = {}

const httpRequest = (reqParams, data) => new Promise((resolve, reject) => {
    const options = { ...reqParams }
    options.rejectUnauthorized = false
    options.hostname = options.hostname.replace(/(^\w+:|^)\/\//, '')
    const req = https.request(options, (response) => {
        let body = ''
        const { headers } = response
        const { statusCode } = response

        // eslint-disable-next-line no-return-assign
        response.on('data', (chunk) => body += chunk)
        response.on('end', () => resolve({ headers, statusCode, body }))
    }).on('error', reject)
    if (data && options.method !== 'GET') {
        req.write(JSON.stringify(data))
    }
    req.end()
})

request.asyncRequest = async (options, data) => {
    try {
        const response = await httpRequest(options, data)
        const responseBody = JSON.parse(response.body)
        const result = { body:responseBody, headers: response.headers, statusCode: response.statusCode }
        if ([200, 201, 202, 208, 204].indexOf(response.statusCode) > -1) {
            return result
        }
        return Promise.reject(result)
    } catch (e) {
        return Promise.reject(e)
    }
}

module.exports = request