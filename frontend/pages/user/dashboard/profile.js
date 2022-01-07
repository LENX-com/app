import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from '@windmill/react-ui'
import _ from 'lodash'
import { AiFillFileImage, AiOutlineClose } from "react-icons/ai";
import withAuth from '@/components/auth'
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { Formik, Field, useFormikContext } from "formik";
import { addShippingInfo, userProfileUpdate } from "@/redux/actions/authAction";
import Layout from '@/dashboard/containers/Layout'


const Profile = () => {
  const dispatch = useDispatch();
  const {loading, user } = useSelector((state) => state.auth);
  const [load, setload] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ isCreated, setIsCreated] = useState(false)

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
  width: 150,
  height: 150,
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

  const validatorForm = Yup.object().shape({
                name: 
                    Yup.string()
                    .required("Required"),
                address: 
                    Yup.string()
                    .required("Required"),
                mobile: 
                    Yup.string()
                      .matches(/^[0-9]+$/, "Must be only digits")
                      .min(7, 'Number does not contain enough numbers ')
                      .max(15, 'The number contains too many numbers pal'),
            })

  return (
    <Layout>
      <div className="mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="my-6 md:mt-0 md:col-span-2">
           <Formik
          initialValues={{ 
            name: user.name,
            about: user.about,
            file: [],
            address: user.shipping?.address ? user.shipping?.address : "",
            postalCode: user.shipping?.postalCode ? user.shipping?.city : "",
            city: user.shipping?.city ? user.shipping?.city : "",
            mobile: user.shipping?.mobile ? user.shipping?.mobile : "",
          }}

          validationSchema={validatorForm}
          validateOnChange={isSubmitting}
          validateOnBlur={isSubmitting}

          onSubmit= { async (values, {resetForm, validate}) => {
            
            console.log({values})
            let formData = new FormData();


            formData.append("name", values.name);
            formData.append("about", values.about);
            formData.append("address", values.address);
            formData.append("city", values.city);
            formData.append("mobile", values.mobile);
            formData.append("postalCode", values.postalCode);

            for (let i = 0; i <= values.file.length; i++) {
              formData.append(`file`, values.file[i] );
            }

            dispatch(userProfileUpdate(formData))
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
            <form onSubmit={handleSubmit} className="bg-white border-box">
              <div className="">
                <div className="px-4 py-5  space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6"></div>

                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        onChange={handleChange}
                        value={values.about}
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Brief description for your profile."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Profile Picture
                    </label>
                    <div className="mt-1 flex items-center">
                      <Avatar src={user.avatar} size="large"/>
                    </div>
                  </div>

                 { values.file.length < 1 &&
                        <Dropzone  
                            accept="image/jpeg, image/png"
                            minSize={1024}
                            maxSize={3072000}
                            multiple = {false }
                            onDrop={(acceptedFiles) => {
                        // on drop we add to the existing files
                        setFieldValue("file", values.file.concat(acceptedFiles.map( file => Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        }))));
                        }}>
                                {({ getRootProps, getInputProps }) => (
                        <section className="container p-2 border-box mt-2">
                            <div {...getRootProps({ className: "dropzone text-center" })}>
                                <input name="file" {...getInputProps()} />
                                <div clasName="p-2 mx-auto">
                                    <AiFillFileImage className="my-auto h-12 w-12 m-auto"/>
                                    <div className="my-3 shadow-button rounded cursor-pointer hover:shadow-hover w-1/2 text-center m-auto p-1 "> Add a file </div>
                                </div>
                                <em className="text-xs text-Black-medium">(Include an image for your profile Avatar.)</em>
                            </div>
                        </section>
                    )}
                        </Dropzone>
                    }

                            <div className="px-4 my-2">
                            { values.file.length > 0 && <strong>New Avatar:</strong>}
                            <ul className="list-disc my-2">
                                <aside style={thumbsContainer}>
                                    {values.file?.map((data, i) => {
                                        return (
                                        <div style={thumb} key={data.name} className="relative">
                                            <div style={thumbInner}>
                                                <img
                                                alt="preview"
                                                src={data.preview}
                                                style={img}
                                                />
                                            </div>
                                            <div className=" absolute top-2 right-1 z-50">     
                                                <button
                                                    onClick = { (event) => {
                                                        event.preventDefault();
                                                        setFieldValue("file", _.remove())
                                            }}
                                                    className="rounded-full w-5 h-5 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white">
                                                    <AiOutlineClose className="w-3 h-3"/>
                                                </button>
                                            </div>
                                        </div>
                                        )
                                    })}
                                </aside>
                            </ul>
                            {errors.file && (
                            <div className="input-feedback">{errors.file}</div>
                            )}
                        </div>
                </div>

                <div className="">
                  <div className="shadow-separator px-6 mobile:px-3">
                    <div className="my-2">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      {errors.name && (
                        <div className="input-feedback">{ errors.name }</div>
                      )}
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        id="name"
                        autoComplete="given-name"
                        className="px-3 py-1 shadow-button w-full rounded-md"
                      />
                    </div>

                    <div className="my-2">
                      <label
                        htmlFor="street_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      {errors.address && (
                        <div className="input-feedback">{ errors.address }</div>
                      )}
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={values.address}
                        onChange={handleChange}
                        autoComplete="street-address"
                        className="px-3 py-1 shadow-button w-full rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        id="city"
                        className="px-3 py-1 shadow-button w-full rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2 my-3">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Post Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={values.postalCode}
                        onChange={handleChange}
                        id="postalCode"
                        autoComplete="postal-code"
                        className="px-3 py-1 shadow-button w-full rounded-md"
                      />
                    </div>
                  
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2 mb-4">
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mobile
                      </label>
                      {errors.mobile && (
                        <div className="input-feedback">{ errors.mobile }</div>
                      )}
                      <input
                        type="number"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        id="mobile"
                        autoComplete="postal-code"
                        className="px-3 py-1 shadow-button w-full rounded-md"
                      />
                    </div>
                  </div>
                
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-1 px-4 border border-transparent bg-Blue text-white text font-bold rounded-md"
                  >
                   Save
                  </button>
              </div>
              </div>
            </form>

          )} 
        }
        </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Profile)