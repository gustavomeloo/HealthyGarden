const axios = require("axios")

const URL_USER_API = "https://healthygardenapi.azurewebsites.net/api/User"

/**
 * Recupera um usuário pelo id
 * @param {int} id 
 * @returns 
 */
export const getUser = (id) => {
    return axios({
        url: URL_USER_API + '/' + id,
        method: 'get'
    })
}

/**
 * Cadastra um usuário
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const postUser = (name, email, password) => {
    return axios({
        url: URL_USER_API,
        method: 'post',
        data: {
            name,
            email,
            password
        }
    })
}

/**
 * Atualiza um usuário no banco
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const putUser = (id,name, email, password, salt) => {
    return axios({
        url: URL_USER_API,
        method: 'put',
        data: {
            id,
            name,
            email,
            password,
            salt
        }
    })
}

/**
 * Remove um usuário do banco
 * @param {int} userId 
 * @returns 
 */
export const deleteUser = (userId) => {
    return axios({
        url: URL_USER_API + '/' + userId,
        method: 'delete',
    })
}

/**
 * Realiza o login da aplicação
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const login = async (email, password) => {
  return axios({
    url: URL_USER_API + '/login',
    method: 'post',
    data : { 
      email, 
      password 
    }
  })
}

/**
 * Recupera um usuário pelo e-mail
 * @param {string} email 
 * @returns 
 */
export const getUserEmail = (email) => {
  return axios({
      url: URL_USER_API + '/' + email,
      method: 'get'
  })
}

