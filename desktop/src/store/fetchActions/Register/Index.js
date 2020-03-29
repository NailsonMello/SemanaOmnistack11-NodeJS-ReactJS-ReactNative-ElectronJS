import api from '../../../Services/ApiService'
import { addOng } from '../../ducks/Register/Index'

export const addOngs = (data) => {
    return (dispatch) => {
        api.post('ongs', data)
            .then((res) => {
                dispatch(addOng(res.data))
                //alert(`Mensagem: ${res.data.message}`)
                setTimeout(() => {
                    window.location.pathname = '/'
                }, 2500)

            })
            .catch(console.log)
    }
}