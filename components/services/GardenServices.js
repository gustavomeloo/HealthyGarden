const axios = require("axios")
const URL_GARDEN_API = 'https://healthygardenapi.azurewebsites.net/api/Garden'

/**
 * Resgata uma horta pelo id
 * @param {int} id 
 * @returns 
 */
export const getGarden = (id) => {
    return axios({
        url: URL_GARDEN_API + '/' + id,
        method: 'get'
    })
}

/**
 * Resgata uma horta pelo id do usuário
 * @param {int} idUser 
 * @returns 
 */
export const getGardenByIdUser = (idUser) => {
    return axios({
        url: URL_GARDEN_API + '/user/' + idUser,
        method: 'get'
    })
}

/**
 * Cadastra uma horta
 * @param {string} name 
 * @param {string} description 
 * @param {int} userId 
 * @param {int} moistureStatus 
 * @param {int} temperatureStatus 
 * @returns 
 */
export const postGarden = (name, description, userId, moistureStatus = 3, temperatureStatus = 3) => {
    return axios({
        url: URL_GARDEN_API,
        method: 'post',
        data: {
            userId,
            moistureStatus,
            temperatureStatus,
            name,
            description
        }
    })
}

/**
 * Atualiza uma horta
 * @param {string} name 
 * @param {string} description 
 * @returns 
 */
export const putGarden = (id, userId, moistureStatus, temperatureStatus, name, description) => {
    return axios({
        url: URL_GARDEN_API,
        method: 'put',
        data: {
            id,
            userId,
            moistureStatus,
            temperatureStatus,
            name,
            description
        }
    })
}

/**
 * Remove uma horta do banco
 * @param {int} gardenId 
 * @returns 
 */
export const deleteGarden = (gardenId) => {
    return axios({
        url: URL_SETTING_API + "/" + gardenId,
        method: 'delete',
    })
}
