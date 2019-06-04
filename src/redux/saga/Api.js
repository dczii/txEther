
async function processAPI(url) {
    const response = await fetch(url, { method: "GET" })

    let responseJSON = await response.json()

    return responseJSON
}


  export const Api = {
    processAPI,
 };