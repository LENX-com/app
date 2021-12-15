import { useState, Fragment, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Redirect, Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../../actions/authAction";
import Google from "../../../marketplace/containers/social-login/Google";
import { Label, Input } from "@windmill/react-ui";
import Button from '../../../components/Buttons/Button'
import { GoMarkGithub as GithubIcon } from "react-icons/go";
import { Formik, Field, FieldArray } from "formik";
import { signup } from '../../../actions/'

const SignInPop = ({ isOpen = true, setIsOpen }) => {
  let completeButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ error, setError ] = useState(false)
  const history = useHistory()
  const { isAuthenticated } = useSelector((state) => state.auth);

  const validatorForm = Yup.object().shape({
                name: 
                    Yup.string()
                    .required("Required"),

                 email: 
                    Yup.string().email()
                    .required("Required"),

                password: Yup.string()
                    .required('No password provided.') 
                    .min(8, 'Password is too short - should be 8 chars minimum.')
                        .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                    ),
            })
  

    if(isAuthenticated){
              history.push('/')
            }

  return (
    <div className="my-3 lg:w-2/5 mx-auto"> 
      <Formik
          initialValues={{
            name: "",
            email: '',
            password: "",
          }}

          validationSchema={validatorForm}
          validateOnChange={isSubmitting}
          validateOnBlur={isSubmitting}

          onSubmit= { async (values, {resetForm, validate}) => {

            let formData = {
              name: values.name,
              email: values.email,
              password: values.password
            };

            signup(formData).then(res => {
                console.log(res)
                if (res.user) {
                    history.push('/signin')
                } else if (res.err) {
                    setError("User Already exists")
                }
            })
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
                      User already exists
                    </div>
                }
                {errors.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              <Label className="p-2 border-box rounded-md bg-white">
                <Input
                  className="mt-1"
                  type="name"
                  placeholder="Name or Username"
                  value={values.name}
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
              </Label>

              <div className="mt-4">  
                    {errors.email && (
                    <div className="input-feedback">{errors.email}</div>
                    )}
                <Label className="p-2 border-box rounded-md bg-white">
                    <Input
                    className="mt-1"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    name="email"
                    id="email"
                    onChange={handleChange}
                    />
                </Label>
              </div>

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
                Signup
              </Button>

              <hr className="my-6" />

              <Google />

            </div>
          </main>
        </div>
      </form>
         )}}
      </Formik>
    </div>
  );
};

export default SignInPop;
