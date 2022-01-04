import React, { useState, useEffect } from 'react';
import { Formik, Field, FieldArray } from "formik";
import { AiFillFileImage, AiOutlineClose, AiFillTags } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { Alert } from '@windmill/react-ui'
import SectionTitle from "@/components/Typography/SectionTitle";
import { useDispatch, useSelector } from 'react-redux' 
import { Input, Label, Select } from '@windmill/react-ui'
import DisplayLottie from "@/components/DisplayLottie/DisplayLottie";
import Success from "@/assets/lotties/success";
import dynamic from 'next/dynamic'
import _ from 'lodash'
import { sendApplication } from '@/redux/actions/userActions'
import Card from '@/components/Cards/Card';
import Button from '@/components/Buttons/Button';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const ApplyToBecomeSeller = () => {
    const { token } = useSelector((state) => state.auth);
    const [ category, setCategory ] = useState('')
    const [ subs, setSubs ] = useState('')
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ isCreated, setIsCreated] = useState(false)
    
    const dispatch = useDispatch();
    

    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };

    const SuccesfulApplication = () => (
        <Card>
            <div>
                <div className="lg:w-1/5 mx-auto w-2/5">
                    <DisplayLottie animationData={Success} />
                </div>
                <div className="text-center">
                    <h1 className="text-Black-text font-bold text-lg my-3"> All good! Your application was sent succesfully</h1>
                </div>
                <div className="my-4 text-center">
                    <p className="text-Black-medium"> You will be notified of the outcome of your application.
                         <br />
                         Due to the high volume of applications, we can only accept a limited number of applicants - in order to ensure the high quality of the platform. 
                    </p>
                </div>
            </div>
        </Card>
    )


const validatorForm = Yup.object().shape({
                 name: 
                    Yup.string()
                    .required("Your name is required"),
                summary: 
                    Yup.string()
                    .required("A summary is required"),
                email: 
                    Yup.string().email()
                    .required("A valid email is required"),
                
                mobile: 
                    Yup.string()
                      .matches(/^[0-9]+$/, "Must be only digits")
                      .min(7, 'Number does not contain enough numbers ')
                      .max(15, 'The number contains too many numbers pal'),

            })


    return (
    <div className="container lg:w-2/5 mx-auto">

        {/* Show card if the application was send, so we let the user know to wait */}
        { isCreated ?
            ( 
                <>
                   <SuccesfulApplication /> 
                </>
                ) : (
                
        <>
            <div className="px-2 mt-2">
                <SectionTitle> Apply to become a seller </SectionTitle>
            </div>
            <div className="relative">
                <Formik
                initialValues={{
                    name: '',
                    summary: '',
                    email:'',
                    mobile: "",
                    
                }}

                validationSchema={validatorForm}
                validateOnChange={isSubmitting}
                validateOnBlur={isSubmitting}

                onSubmit= { async (values, {resetForm, validate}) => {


                let formData = {
                    name: values.name,
                    summary: values.summary,
                    email: values.email,
                    mobile: values.mobile,
                }

                dispatch(sendApplication(formData))

                resetForm({values: ''})
                setIsCreated(true)

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
                    <form onSubmit={handleSubmit}>
                        
                        <div className="lg:grid gap-4 mb-8">
                            <Card className="lg:col-span-2">
                                <div className="mb-4">
                                <Label>
                                    <span className="text-base font-medium"> Your name </span>
                                    <div className="mt-1 p-2 rounded-md shadow-button">
                                        <Input 
                                            valid
                                            className={``}
                                            id="name"
                                            name="name" 
                                            type="text"
                                            value={values.name}
                                        onChange={handleChange} />
                                    </div>
                                </Label>
                                {errors.name && (
                                <div className="input-feedback">{errors.name}</div>
                                )}
                            </div>
                            <div className="my-2">
                                <span className="text-base font-medium p-2"> Summary of your services</span>
                                <Field name="summary">
                                    {({ field }) => <ReactQuill className="products" value={field.value} onChange={field.onChange(field.name)} />}
                                </Field>
                                {errors.summary && (
                                    <div className="input-feedback">{errors.summary}</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <Label>
                                    <span className="text-base font-medium"> E-mail </span>
                                    <div className="mt-1 p-2 rounded-md shadow-button">
                                        <Input 
                                            valid
                                            id="email"
                                            name="email" 
                                            type="text"
                                            value={values.email}
                                        onChange={handleChange} />
                                    </div>
                                </Label>
                            </div>
                            {errors.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                            <div className="mb-4">
                                <Label>
                                <span className="text-base font-medium text-Black"> Your Mobile Number: <span className="text-sm">(optional)</span></span>
                                    <div className="mt-1 p-2 rounded-md shadow-button">
                                        <Input 
                                            valid
                                            id="mobile"
                                            name="mobile" 
                                            type="number"
                                            value={values.mobile}
                                            onChange={handleChange} />
                                    </div>
                                </Label>
                                {errors.mobile && (
                                <div className="input-feedback">{errors.mobile}</div>
                                )}
                            </div>
                        </Card>

                    </div>
                        <div className="w-full z-50 lg:relative lg:mb-10 text-center">
                            <Button className="bg-Black text-white w-3/5 ml-3" type="submit" onClick={() => setIsSubmitting(true)}>
                                Apply   
                            </Button>
                        </div>
                </form>
            )} 
            }
        
            </Formik>
            <div className="my-10">
                <div className="mobile:text-center">
                    <h1 className="font-bold text-lg text-Black-text"> Have any questions? </h1>
                    <p className="text-Black-medium"> 
                        Contact us at
                        <a href="mailto:info:wabei.co.uk" className="font-bold"> info@wabei.co.uk </a>
                    </p>
                </div>
            </div>
        </div>
        </>
        )}
    </div>
    )};

export default ApplyToBecomeSeller


    