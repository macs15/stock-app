import { getErrorMsg } from '@helpers/errors'
import { HttpStatusCode } from '@helpers/response-status-code'
import axios from 'axios'

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL || ''

interface HttpRequestParams {
  statusCodes: typeof HttpStatusCode
  https?: string
  endpoint: string
  headers?: Headers
}

type Headers = Record<string, string>

export default class HttpRequest implements HttpRequestParams {
  statusCodes
  https
  endpoint
  headers: Headers

  constructor() {
    this.statusCodes = HttpStatusCode
    this.https = 'https://'
    this.endpoint = ''
    this.headers = {
      'Content-Type': 'application/json'
    }
  }

  config(params: HttpRequestParams) {
    this.endpoint = params.endpoint || this.endpoint
    this.headers = '' || this.headers
  }

  configEndpoint(value: string) {
    this.endpoint = value
  }

  configHeaders(value: Headers) {
    this.headers = value
  }

  urlBuilder() {
    return `${this.https}${BACKEND_URL}${this.endpoint}`
  }

  get(id?: number | string) {
    try {
      if (id) {
        return axios.get(`${this.urlBuilder()}/${id}`, {
          headers: this.headers
        })
      }
      return axios.get(`${this.urlBuilder()}`, {
        headers: this.headers
      })
    } catch (err) {
      return Promise.reject(new Error(getErrorMsg(err)))
    }
  }

  post(data: unknown) {
    try {
      return axios.post(`${this.urlBuilder()}`, data, {
        headers: this.headers
      })
    } catch (err) {
      return Promise.reject(new Error(getErrorMsg(err)))
    }
  }

  put(data: unknown) {
    try {
      return axios.put(`${this.urlBuilder()}`, data, {
        headers: this.headers
      })
    } catch (err) {
      return Promise.reject(new Error(getErrorMsg(err)))
    }
  }

  delete(id: string | number) {
    try {
      return axios.delete(`${this.urlBuilder()}/${id}`, {
        headers: this.headers
      })
    } catch (err) {
      return Promise.reject(new Error(getErrorMsg(err)))
    }
  }
}
