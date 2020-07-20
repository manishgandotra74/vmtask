import API from '../apis/user-api';
import { Types } from "../constants/user-type";
export function authenticate(params) {
	return async function (dispatch, getState) {
		try {
			let user = await API.checkauthentication(params);
			return user.data
			// dispatch({ type: Types.AUTHMESSAGE,payload: user.data});
		} catch (err) {}
	};
}

export function register(params) {
	return async function (dispatch, getState) {
		try {
			let user = await API.registeruser(params);
			return user.data;
			// dispatch({ type: Types.REGISTER_MESSAGE,payload: user.data});
		} catch (err) {}
	};
}
