import React from "react"
import {toast} from "react-toastify"
import loginUtils from "./LoginUtils"

export default abstract class RequestUtils {
    static async request(method: string,
                         url: string,
                         onError401: Function = () => undefined,
                         authorized = false,
                         body = undefined): Promise<Response>{
        const headers: { [k: string]: string } = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        if (authorized)
            headers['Authorization'] = `Token ${loginUtils.getToken()}`

        try {
            const resp = await fetch(url, {
                method,
                headers,
                body: body !== undefined ? JSON.stringify(body) : undefined,
            })
            if (resp.status >= 300) {
                switch (resp.status) {
                    case 400:
                        const errors = (await resp.json()).map((e: any) => (<><span>{e}</span><br/></>))
                        toast.error(<>{errors}</>)
                        break
                    case 401:
                        toast.error("Login required!", {toastId: "Not logged in"})
                        onError401()
                        break
                    default:
                        toast.error(`Error! (status code: ${resp.status})`)
                        break
                }
            }
            return resp
        } catch (e) {
            toast.error("Couldn't connect to server!", {toastId: "No server connection"})
            console.log(e)
            return Promise.reject(e)
        }
    }

    static async get(url: string, onError401: Function = () => undefined, authorized = true) {
        return await this.request('GET', url, onError401, authorized, undefined)
    }

    static async post(url: string, body: any = {}, onError401: Function = () => undefined, authorized = true) {
        return await this.request('POST', url, onError401, authorized, body)
    }

    static async put(url: string, body: any = {}, onError401: Function = () => undefined) {
        return await this.request('PUT', url, onError401, true, body)
    }

    static async delete(url: string, onError401: Function = () => undefined) {
        return this.request('DELETE', url, onError401, true)
    }
}
