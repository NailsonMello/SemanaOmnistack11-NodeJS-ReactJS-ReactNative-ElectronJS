import api from '../../../Services/ApiService'
import { login } from '../../ducks/Logon/Index'

export const authLogin = (id) => {
    return (dispatch) => {
        api.post('session', { id })
            .then((res) => {
                localStorage.setItem('ongId', id)
                localStorage.setItem('ongName', res.data.name)
                dispatch(login());

                window.location.pathname = '/profile'
            })
            .catch((error) => {
                const { message } = error.response.data;
                console.log(message);
                
                //dispatch(addMessage(message));
            });
    };
};