import {server} from '../const/config'
const axios = require('axios');


export const generateFile = () => new Promise((resolve, reject) => {
    axios.get(server + '/generate-file')
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      reject(error);
    })

})

export const getFileStats = (stats_link) => new Promise((resolve, reject) => {
    axios.get(stats_link)
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      reject(error);
    })

})