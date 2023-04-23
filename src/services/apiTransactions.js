import axios from "axios";

function createConfig(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}
export function getTransactions(token) {
    const promisse = axios.get(`${process.env.REACT_APP_API_URL}/transactions`, createConfig(token));
    return promisse;
}
