import {API} from '@/config/config'
import cookie from 'js-cookie';

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = next => {
     if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/auth/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};
  
export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false; 
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

// set in cookie
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
};
// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};
// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};
// set in localstorage
export const setLocalStorage = (key, data) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
    }
};
// remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
// authenticate user by passing data to cookie and localstorage during signin
export const authenticateHelper = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('jwt', response.data.token);
    setLocalStorage('jwt', response.data);
    next();
};
// access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('data');
        if (cookieChecked) {
            if (localStorage.getItem('data')) {
                return JSON.parse(localStorage.getItem('data'));
            } else {
                return false;
            }
        }
    }   
};

export const resetPassword = user => {
    return fetch(`${API}/recover`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json() && console.log(response.json);
        })
        .catch(err => {
            console.log(err);
        });
};
