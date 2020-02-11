import axios from 'axios'

export const getNoAuth = (url) => {
    return axios({
        method : 'GET',
        headers : {
            'Accept' : 'application/json'
        },
        url : `${process.env.VUE_APP_API}${url}`,
    })
}

export const postNoAuth = (url,data) => {
    return axios({
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        url : url,
        data : data
    })
}

export const get = (url) => {
    return axios({
        method : 'GET',
        headers : {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        url : `${process.env.VUE_APP_API}${url}`,
    })
}

export const post = (url,data) => {
    return axios({
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        },
        url : `${process.env.VUE_APP_API}${url}`,
        data : data
    })
}

export const put = (url, data) => {
    return axios({
        method : 'PUT',
        headers : {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        },
        url : `${process.env.VUE_APP_API}${url}`,
        data : data
    })
}

export const destroy = (url, data) => {
    return axios({
        method : 'DELETE',
        headers : {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
        },
        url : `${process.env.VUE_APP_API}${url}`,
        data : data
    })
}

export const postImg = (url, data) => {
    return axios({
        method : 'POST',
        headers : {
            'Accept' : 'multipart/form-data',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'multipart/form-data'
        },
        url : `${process.env.VUE_APP_API}${url}`,
        data : data
    })
}


