import { useState, Fragment, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Link from 'next/Link'
import { useRouter } from 'next/router'
import * as Yup from "yup";
import Layout from '@/containers/Layout'
import { login } from "@/redux/actions/authAction";
import Google from "@/marketplace/containers/social-login/Google";
import { Label, Input } from "@windmill/react-ui";
import Button from '@/components/Buttons/Button'
import { GoMarkGithub as GithubIcon } from "react-icons/go";
import { Formik, Field, FieldArray } from "formik";
import {
  AiOutlineTwitter as TwitterIcon,  
  AiFillGoogleCircle as GoogleCircle,
} from "react-icons/ai";
import { Desktop, Mobile } from '@/config/ScreenSize' 

const SignInPop = () => {
  let completeButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const router = useRouter()
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  const validatorForm = Yup.object().shape({
                 email: 
                    Yup.string().email()
                    .required("Required"),

                password:
                    Yup.string()
                    .required("Required")
            })
  
   const handleRedirect = () => {
       router.push("/signup");
   }

  if(isAuthenticated){
              router.push('/')
            }

  return (
    <Layout>
        <div className="my-3 lg:w-2/5 mx-auto"> 
            <Formik
                initialValues={{
                    email: '',
                    password: "",
                }}

                validationSchema={validatorForm}
                validateOnChange={isSubmitting}
                validateOnBlur={isSubmitting}

                onSubmit= { async (values, {resetForm, validate}) => {

                    let formData = {
                    email: values.email,
                    password: values.password
                    };

                    dispatch(login(formData))
                    setIsSubmitting(true)
                    resetForm({values: ''})

                    //Redirect home if login successful
                
                }}>

                    
                {(formik) => {
                const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
                handleBlur,
                isValid,
                dirty
                } = formik;
          
      return (
          
      <form className="p-3">
        <div className="">
          <main className="items-center justify-center">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Support and empower small businesses
              </h1>
              {/* Check whether the email and username are valid */}
                {
                  error && isSubmitting && 
                    <div className="text text-red-500 my-3">
                      Username or password does not match
                    </div>
                }
                {errors.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              <Label className="p-2 border-box rounded-md bg-white">
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="Email or Username"
                  value={values.email}
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </Label>

              <div className="mt-4">  
                  {errors.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                <Label className="border-box rounded-md p-2 bg-white">
                  <Input
                    className="mt-1"
                    value={values.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Label>
              </div>

              <Button
                onClick={handleSubmit}
                className="mt-4 bg-Blue focus:outline-none focus:ring-2 focus:ring-Blue focus:ring-opacity-30 w-full text-white "
                block
              >
                Log in
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-bold text-Black dark:text-purple-400 hover:underline"
                  href="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>

              <hr className="my-6" />

              <Google />

              {/* <Button className="mt-2 flex w-full text-center justify-center">
                <GithubIcon className="text-xl mr-2" aria-hidden="true" />
                Continue with Github
              </Button> */}
 
              <p className="mt-3">
                <button
                  className="text-sm font-bold text-Black dark:text-purple-400 hover:underline"
                  type="button"
                  onClick= {handleRedirect}
                >
                  Create account
                </button>
              </p>
            </div>
          </main>
        </div>
      </form>
         )}}
      </Formik>
    </div>
    </Layout>     
  );
};

export default SignInPop;
