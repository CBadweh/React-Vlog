// LOGIN_START
// Take userCredentials (username & password)
// return nothing and wait for LOGIN_SUCCESS or LOGIN_FAILURE
export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START", // Action name 
});

// LOGIN SUCCESS - return user
// return the updated user state
export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS", // Action name
    payload: user, //update our user state
});

// LOGIN FAILURE
// we are not taking anything
export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
});

export const Logout = () => ({
    type: "LOGOUT",
});



