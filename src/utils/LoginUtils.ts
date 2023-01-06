export default abstract class LoginUtils {
    static setLoggedIn(token: string, selfID: string) {
        localStorage.setItem('token', token)
        localStorage.setItem('selfID', selfID)
    }

    static isLoggedIn() {
        const token = this.getToken()
        return !!token
    }

    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('selfID')
    }

    static getToken() {
        return localStorage.getItem('token')
    }

    static getID() {
        return Number(localStorage.getItem('selfID'))
    }
}
