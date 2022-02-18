const axios = require("axios")
const URL_HISTORIC_API = 'https://healthygardenapi.azurewebsites.net/api/Historic'

/**
 * Recupera os últimos 7 registros do histórico pelo id da horta
 * @param {int} id 
 * @returns 
 */
export const getHistoricByIdGarden = (id) => {
    return axios({
        url: URL_HISTORIC_API + '/garden/' + id,
        method: 'get'
    })
}

/**
 * Registra o histórico de uma determinada horta
 * @param {int} gardenId 
 * @param {int} moisture 
 * @param {int} temperature 
 * @returns 
 */
export const postHistoric = (gardenId, irrigationDate, moisture, temperature ) => {
    return axios({
        url: URL_HISTORIC_API,
        method: 'post',
        data: {
            gardenId,
            irrigationDate,
            moisture,
            temperature
        }
    })
}