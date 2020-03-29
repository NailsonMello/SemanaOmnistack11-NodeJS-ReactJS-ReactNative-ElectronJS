import api from '../../../Services/ApiService'
import { addIncidents, deleteIncidents } from '../../ducks/NewIncidents/Index'

export const addIncident = (data, ongId) => {
    return (dispatch) => {
        api.post('incidents', data, {
            headers: {
                Authorization: ongId
            },
        })
            .then((res) => {
                dispatch(addIncidents(res.data))
                setTimeout(() => {
                    window.location.pathname = '/profile'
                }, 1500)
            })
            .catch(console.log)
    }
}

export const deleteIncident = (id, ongId) => {
    return (dispatch) => {
        api.delete(`incidents/${id}`, {
            headers: {
                Authorization: ongId
            }
        })
            .then((res) => {
                dispatch(deleteIncidents(res.data))
                //window.location.pathname = '/profile'
            })
            .catch(console.log)
    }
}