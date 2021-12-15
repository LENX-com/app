import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import Button from '@/components/Buttons/Button'
import {
  AiFillGoogleCircle as GoogleCircle,
} from "react-icons/ai";
import { useDispatch } from 'react-redux'
import { API } from '@/config/config';
import { loadUser, googleLogin } from '@/redux/actions/authAction'


const Google = ({ informParent = f => f }) => {
    const dispatch = useDispatch()

    const responseGoogle = response => {
         axios({
            method: 'POST',
            url: `${API}/google-login`,
            data: { idToken: response.tokenId }
        })
            .then(response => {
                console.log('this was a succesful login', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    };

    return (
        <div>
            <GoogleLogin
                clientId={"25703732402-g72j15t1k7uk4mntt8olel9q806r1jvn.apps.googleusercontent.com"}
                onSuccess={(response) => dispatch(googleLogin(response))}
                onFailure={responseGoogle}
                render={renderProps => (
              <Button className="flex w-full text-center justify-center bg-white text font-bold"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                <GoogleCircle className="text-xl mr-2" aria-hidden="true" />
                Continue with Google
              </Button>
                )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Google;