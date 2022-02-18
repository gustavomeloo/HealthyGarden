const axios = require("axios")
const URL_SETTING_API = 'https://healthygardenapi.azurewebsites.net/api/Setting'

/**
 * Recupera as configurações de uma horta pelo id
 * @param {int} gardenId 
 * @returns 
 */
export const getSetting = (gardenId) => {
    return axios({
        url: URL_SETTING_API + '/' + gardenId,
        method: 'get'
    })
}

/**
 * Cadastra as configurações du muma horta
 * @param {bool} isAutomatic 
 * @param {int} minimumMoisture 
 * @param {int} maximumMoisture 
 * @param {int} minimumTemperature 
 * @param {int} maximumTemperature 
 * @returns 
 */
export const postSetting = (isAutomatic, minimumMoisture, maximumMoisture, minimumTemperature, maximumTemperature) => {
    return axios({
        url: URL_SETTING_API,
        method: 'post',
        data: {
            isAutomatic,
            minimumMoisture,
            maximumMoisture,
            minimumTemperature,
            maximumTemperature
        }
    })
}

/**
 * Atualiza as configurações da horta
 * @param {int} gardenId 
 * @param {bool} isAutomatic 
 * @param {int} minimumMoisture 
 * @param {int} maximumMoisture 
 * @param {int} minimumTemperature 
 * @param {int} maximumTemperature 
 * @returns 
 */
export const putSetting = (gardenId, isAutomatic, minimumMoisture, maximumMoisture, minimumTemperature, maximumTemperature) => {
    return axios({
        url: URL_SETTING_API,
        method: 'put',
        data: {
            gardenId,
            isAutomatic,
            minimumMoisture,
            maximumMoisture,
            minimumTemperature,
            maximumTemperature
        }
    })
}

/**
 * Remove as configurações de uma horta
 * @param {int} settingId 
 * @returns 
 */
export const deleteSetting = (settingId) => {
    return axios({
        url: URL_SETTING_API + "/" + settingId,
        method: 'delete',
    })
}

