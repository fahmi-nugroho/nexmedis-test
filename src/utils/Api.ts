import axios, { type AxiosResponse } from 'axios'
import { app } from '@/main'

const baseInstance = axios.create({
  headers: {
    common: {
      Accept: 'text/plain, */*',
    },
  },
  baseURL: 'https://reqres.in/api/',
})

const errorApiHandler = (error: any) => {
  console.log('🚀 ~ errorApiHandler ~ error:', error)
  let tempSummary = ``
  let tempDetail = ``
  if (error.response.data.error) {
    tempSummary = error.response.data.error
  } else {
    tempSummary = error.message
  }

  app.config.globalProperties.$toast.add({
    severity: 'error',
    summary: tempSummary,
    detail: tempDetail,
    life: 3000,
  })
  throw new Error(tempSummary)
}

baseInstance.interceptors.request.use(
  (config) => {
    const token = ''
    if (!token) {
      config.headers['Authorization'] = ''
    } else {
      config.headers['Authorization'] = token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const apiBasePost = async (url: string, data: object) => {
  try {
    let response = await baseInstance.post(url, data)
    return response.data
  } catch (error) {
    errorApiHandler(error)
  }
}
const apiBaseGet = async (url: string, data: object) => {
  try {
    let response = await baseInstance.get(url, data)
    return response.data.data
  } catch (error) {
    errorApiHandler(error)
  }
}
const apiBasePut = async (url: string, data: object) => {
  try {
    let response = await baseInstance.put(url, data)
    app.config.globalProperties.$toast.add({
      severity: 'success',
      summary: response.data.message,
      life: 3000,
    })
    return response.data
  } catch (error) {
    errorApiHandler(error)
  }
}
const apiBaseDelete = async (url: string, data: object) => {
  try {
    let response = await baseInstance.delete(url, data)
    app.config.globalProperties.$toast.add({
      severity: 'success',
      summary: response.data.message,
      life: 3000,
    })
    return response.data
  } catch (error) {
    errorApiHandler(error)
  }
}

export { apiBasePost, apiBaseGet, apiBasePut, apiBaseDelete }
