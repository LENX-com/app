import { useState, Fragment, useRef, useEffect, useContext, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Link from 'next/link'
import * as Yup from "yup";
import { login } from "@/redux/actions/authAction";
import Google from "@/marketplace/containers/social-login/Google";
import { SignInContext } from '@/context/SignInContext'
import { useRouter } from 'next/router'
import Button from '@/components/Buttons/Button'
import { Formik, Field, FieldArray } from "formik";
import PopUp from '../pop/PopUp'

const SignInPop = () => {
  
  const { OpenSign, closeSidebar, toggleSidebar, setOpenSign } = useContext(SignInContext)
    const router = useRouter()
  let completeButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [ isSubmitting, setIsSubmitting ] = useState(false)
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
       setOpenSign(false)
   }

   const Form = () => (
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
            if(isAuthenticated){
              router.push('/')
            }
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 ">
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
              <div className="border-box">
                <input
                  className="focus:outline-none focus:ring focus:border-blue-500 w-full rounded-[12px] p-3 
                  "
                  type="email"
                  placeholder="Email or Username"
                  value={values.email}
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4">  
                  {errors.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                <div className="border-box">
                  <input
                    className="focus:outline-none focus:ring focus:border-blue-500 w-full rounded-[12px] p-3 "
                    value={values.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
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
                  className="text-sm font-bold text-Black hover:underline"
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
                  className="text-sm font-bold text-Black hover:underline"
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
   )
  return (
    <div>
      <PopUp  isOpen = {OpenSign} setIsOpen = {setOpenSign}  title="Login">
        <Form />
      </PopUp>
    </div>
  );
};

export default SignInPop  
