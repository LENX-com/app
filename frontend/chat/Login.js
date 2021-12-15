import {memo} from 'react';
import { Button } from '@material-ui/core';
import './Login.css'

function Login() {

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
                    alt=""
                />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default memo(Login)