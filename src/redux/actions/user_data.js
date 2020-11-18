import axios from "axios";
import { GET_LIST_USER , BASE_API_URL, GET_LIST_USER_ERROR} from "../constantsvar";

export const Get_List_User = () => {
    return async dispatch => {
        try {
            // let response = await axios.get(`${BASE_API_URL}/data/users/`)
            // dispatch({type: GET_LIST_USER, list_data: response.data.data})
        } catch (error) {
            dispatch({type: GET_LIST_USER_ERROR })
        }
    }
}