import axios from "axios";


export function signIn(body) {
    const promisse = axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, body);
    return promisse;
}

export function signUp(body) {
    const promisse = axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body);
    return promisse;
}