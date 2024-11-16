// Reducer is used to dispatch our actions: LOGIN_START, LOGIN_SUCCESS, and LOGIN_FAILURE

const Reducer = (state, action) => {
    switch (action.type) { //
        // LOGIN IN CONTEXT API
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true, // when we click 'Login' button -> we can have progress bar. it'll stop fetching when login is success or fail
                error: false,     // no error because we are still fetching
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload, // return the user
                isFetching: false,    // finished loggin in
                error: false,         // we successfuly logged in
            };
        case "LOGIN_FAILURE":
            return {
                user: null,         // return null 
                isFetching: false,  // failed to logged in, but finish loggin in process
                error: true,        //
            };
        
        // UPDATE USER SETTING CONTEXT API
        case "UPDATE_START":
            return {
                ...state,           // nothing will chage
                isFetching: true
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload, // update user
                isFetching: false,
                error: false,
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,   // don't change the user 
                isFetching: false,
                error: true,
            };
        // LOGOUT CONTEXT API
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };

        default:
            return state;
    }
};

export default Reducer;