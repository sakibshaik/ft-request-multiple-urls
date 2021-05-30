const request = require("./request");

async function requestMultipleUrls(urls) {
    const data = [];
        if(validateInput(urls)) {
            for (const url of urls){
                const path = new URL(url);
                const options = {
                    hostname: path.hostname,
                    path: `${path.pathname}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                };
                try {
                    const response = await request.asyncRequest(options)
                    data.push(response.body)
                } catch (e) {
                    console.error(e, url)
                }
            }
            return data
        } else {
            throw new Error("invalid urls")
        }
}

function validateInput(urls) {
    const regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return Array.isArray(urls) && urls.length && urls.every(url => (typeof url === "string" && regexp.test(url)));
}

module.exports = requestMultipleUrls