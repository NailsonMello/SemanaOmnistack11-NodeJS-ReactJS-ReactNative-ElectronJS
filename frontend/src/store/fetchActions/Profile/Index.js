import api from '../../../Services/ApiService'
import { getIncidentsOng } from '../../ducks/Profile/Index'

export const getIncidents = (ongId) => {
    return (dispatch) => {
        api
            .get('profile', {
                headers: {
                    Authorization: ongId
                }
            })
            .then((res) => {   
                dispatch(getIncidentsOng(res.data));
            })
            .catch(console.log);
    };
};
