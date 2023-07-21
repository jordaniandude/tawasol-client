import { showAlertMessage } from "./alerts";
import { api, serverUrl } from "../../utils";

export const GET_PROFILE = "profile/GET_PROFILE"
export const GET_PROFILES = "profile/GET_PROFILES"
export const UPDATE_PROFILE = "profile/UPDATE_PROFILE"
export const PROFILE_ERROR = "profile/PROFILE_ERROR"
export const UPLOAD_PROFILE_IMAGE = "profile/UPLOAD_PROFILE_IMAGE"
export const CLEAR_PROFILE = "profile/CLEAR_PROFILE"

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await api.get("/profiles/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Create or update profile
export const createProfile = (formData, history, edit= false) => async (dispatch) => {
    try {
        const res = await api.post("/profiles", formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data 
        })

        dispatch(showAlertMessage(edit ? "Profile Updated" : "Profile Created", "success"));

        if(!edit) {
            history.push("/home");
        }

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(showAlertMessage(error.msg, "error")))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const uploadProfileImage = data => async dispatch => {
    try {
        const res = await api.post(`${serverUrl}/api/profiles/upload`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res)
        dispatch({
            type: UPLOAD_PROFILE_IMAGE,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const getProfiles = () => async (dispatch) => {
    dispatch({type: CLEAR_PROFILE})

    try {
        console.log("profiles: ")
        const res = await api.get("/profiles")
        console.log("profiles: "+res.data)
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await api.get(`/profiles/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const res = await api.put("/profiles/experience", formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(showAlertMessage("Experience added", "success"));

        history.push("/home");
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const res = await api.put("/profiles/education", formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(showAlertMessage("Education added", "success"));

        history.push("/home");
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await api.delete(`/profiles/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(showAlertMessage("Experience removed", "success"));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteEducation = (id) => async (dispatch) => {
    try {
        console.log(`Education ID to delete is ${id}`)
        const res = await api.delete(`/profiles/education/${id}`);
        console.log(`res.data is ${res.data}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(showAlertMessage("Education removed", "success"));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await api.delete('/profiles');
  
        dispatch({ type: CLEAR_PROFILE });
  
        dispatch(showAlertMessage('Your account has been permanently deleted'));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {},
    image: null
};

export default function reducer(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            };

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null
            }
            case UPLOAD_PROFILE_IMAGE:
                return {
                    ...state,
                    image: payload
                }
                default: return state;
    }
}