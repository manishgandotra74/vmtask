import API from '../apis/topic-api';
import { Types } from "../constants/user-type";
export function addTopics(params) {
	return async function (dispatch, getState) {
		try {
			let user = await API.addtopic(params);
			return user.data
			// dispatch({ type: Types.AUTHMESSAGE,payload: user.data});
		} catch (err) {}
	};
}

export function getTopics(id) {
	return async function (dispatch, getState) {
		try {
			let user = await API.gettopic(id);
			if (user.data.message === "Unauthorized"){
				console.log('i');
				dispatch({type : Types.LOGOUT_CALL,payload:user.data.message} )
			}
			return user.data;
			
			// dispatch({ type: Types.REGISTER_MESSAGE,payload: user.data});
		} catch (err) {}
	};
}
