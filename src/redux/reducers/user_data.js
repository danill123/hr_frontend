import { GET_LIST_USER, GET_LIST_USER_ERROR} from "../constantsvar";

const initialState = {
    list_user : [],
    error: false,
    not_found: false
}

export const List_user = (state=initialState, action={}) => {
    switch (action.type) {
        case GET_LIST_USER:
            // return Object.assign({}, state, { list_user: action.list_data });
        case GET_LIST_USER_ERROR:
            return Object.assign({}, state, { error: true});
        default:
            return state;
    }
}