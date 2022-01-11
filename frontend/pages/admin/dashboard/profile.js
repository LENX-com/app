import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from '@windmill/react-ui'
import _ from 'lodash'
import { AiFillFileImage, AiOutlineClose, AiFillTags } from "react-icons/ai";
import Card from '@/components/Cards/Card';
import * as Yup from "yup";
import withAuth from '@/components/auth'
import Dropzone from "react-dropzone";
import  { getLocations } from '@/redux/actions/productAction'
import { Formik,  Field, FieldArray } from "formik";
import { loadUser, userProfileUpdate } from "@/redux/actions/authAction";
import Layout from '@/admin/containers/Layout'


const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { locations } = useSelector((state) => state.locations);
  const [load, setload] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ isCreated, setIsCreated] = useState(false)

  useEffect(() => {
    dispatch(getLocations())
  }, [])

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

const title = "text-lg font-bold text-Black-medium";

  const validatorForm = Yup.object().shape({
                name: 
                    Yup.string()
                    .required("Required"),
                locations:
                    Yup.array()
                        .required('Enter a location')
                        .min(1, 'Enter a location')
                        .max(6, 'You cannot enter more than four locations'),
                mobile: 
                    Yup.string()
                      .matches(/^[0-9]+$/, "Must be only digits")
                      .min(7, 'Number does not contain enough numbers ')
                      .max(15, 'The number contains too many numbers pal'),
                skills:
                    Yup.array()
                        .required('Enter a skill')
                        .min(1, 'Enter a skill')
                        .max(4, 'You cannot enter more than four skills'),
                photos: 
                    Yup.mixed()
                    .required("A photo is required"),
            })

  return (
    <Layout>
      <div className="mt-10">
        <div className="">
          <div className="my-6">
           <Formik
          initialValues={{ 
            name: user.name,
            about: user.about,
            file: [],
            photos: user.photos ? user.photos : [],
            locations:user.locations ? user.locations : [],
            skills: user.skills ? user.skills : [],
            mobile: user.mobile ? user.mobile : "",
          }}

          validationSchema={validatorForm}
          validateOnChange={isSubmitting}
          validateOnBlur={isSubmitting}

          onSubmit= { async (values, {resetForm, validate}) => {
            
            let formData = new FormData();

            formData.append("name", values.name);
            formData.append("about", values.about);
            formData.append("mobile", values.mobile);

            formData.append("file", values.file)

            for (let i = 0; i <= values.photos.length; i++) {
              values.photos[i] !== undefined && formData.append(`photos`, values.photos[i] );
            }
          

          // to add current photos and remove the ones that are not included anymore
          var currentPhoto = []
          for (let i = 0; i <= values.photos.length; i++) {
              values.photos[i] !== undefined && currentPhoto.push({
                url:values.photos[i].url,
                id:values.photos[i]._id,
                public_id:values.photos[i].public_id
              });
            }
          formData.append("currentPhoto", JSON.stringify(currentPhoto))
          
           // we loop the skills array and assign a value to each task in the form, if any tag is undefined its value will not be looped.           
           for (let i = 0; i <= values.skills.length; i++) {
             values.skills[i] !== undefined && formData.append(`skills`, values.skills[i] );
            }
            
            // we loop the skills array and assign a value to each task in the form, if any tag is undefined its value will not be looped.           
            for (let i = 0; i <= values.locations.length; i++) {
              values.locations[i] !== undefined && formData.append(`locations`, values.locations[i] );
            }
            
            dispatch(userProfileUpdate(formData))
            dispatch(loadUser)
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
            <form 
                  onSubmit={handleSubmit} 
                  className="bg-white border-box"
                  enctype="multipart/form-data"
            >
              <div className="">
                <div className="px-4 py-5  space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6"></div>

                  <div>
                    <label
                      htmlFor="about"
                      className={title}
                    >
                      About
                    </label>
                    <div className="mt-1 rounded-md shadow-button p-2">
                      <textarea
                        id="about"
                        name="about"
                        onChange={handleChange}
                        value={values.about}
                        rows={3}
                        className="focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-full"
                        placeholder="Brief description for your profile."
                      />
                    </div>
                  </div>

                  {/* <div>
                    <label className={title}>
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
                            { values.file.length > 0 && 
                            <>
                              <strong>New Avatar:</strong>
                              <ul className="list-disc my-2">
                                  <aside style={thumbsContainer}>
                                          <div style={thumb} className="relative">
                                              <div style={thumbInner}>
                                                  <img
                                                  alt="preview"
                                                  src={values.file[0].preview}
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
                                  </aside>
                              </ul>
                            </>
                          }
                            {errors.file && (
                            <div className="input-feedback">{errors.file}</div>
                            )}
                        </div> */}
                </div>

                <div className="">
                  <div className="px-6 mobile:px-3">
                    <div className="pb-6">
                      <label
                        htmlFor="first_name"
                        className={title}
                      >
                        Name
                      </label>
                      {errors.name && (
                        <div className="input-feedback">{ errors.name }</div>
                      )}
                      <div className="px-3 shadow-button w-full rounded-md py-1">
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          value={values.name}
                          id="name"
                          autoComplete="given-name"
                          className=""
                        />
                      </div>
                    </div>

                    <div className="pb-6">
                      <label
                        htmlFor="mobile"
                        className={title}
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
                  <div className='px-6 mobile:px-3 pb-6'>
                    <label
                      htmlFor="skills"
                      className={title}
                    >
                      Skills
                    </label>
                    <h3 className="text-base font-medium mt-2"> Add or change skills (up to 4) so buyers know more about your product </h3>
                    <div className="Form">
                        <div className="TagForm mt-3">
                            <AiFillTags className="InputIcon text-lg mx-2" />
                            <input
                                className="p-2"
                                type="text"
                                placeholder="Add a skill..."
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        values.skills.length < 4 && event.target.value !== "" && setFieldValue( "skills" ,[...values.skills, event.target.value]);
                                        event.target.value = "";
                                    }
                                }}
                            />
                        </div>
                        <ul className="TagList">
                            {values.skills && values.skills.map((tag, i) => (
                                <li 
                                    className="Tag capitalize mb-5"
                                    key = {i}
                                >
                                {tag}
                                <AiOutlineClose
                                    className="TagIcon text-lg ml-2"
                                    onClick={() => {
                                    setFieldValue("skills", [...values.skills.filter(word => word !== tag)]);
                                    }}
                                />
                                </li>
                            ))}
                        </ul>
                    </div>
                    {errors.skills && (
                        <div className="input-feedback -m-mt-2">{ errors.skills }</div>
                    )}
                </div>

                <div className="pb-6 px-6 mobile:px-3">
                    <h2 className={title}> Locations that you cover </h2>
                    <div className="m-auto">
                      <select     
                                  className="Selection mt-1 p-2 rounded-md shadow-button bg-white capitalize mobile:w-full" 
                                  name="locations" 
                                  id="locations"
                                  value={values.locations}
                                  onChange={handleChange}
                                  multiple="multiple"
                      >

                        { locations &&
                            locations.map((c, i) => (
                            <option className="px-2" key={i} value={c._id}>
                                {c.location}
                            </option>
                        ))}
                      </select>
                    </div>
                    {errors.locations && (
                      <div className="input-feedback">{errors.locations}</div>
                    )}
                </div>
                <div className="px-6 mobile:px-3 pb-6">
                    <div>
                    <h2 className={title}> Add media </h2>
                        <FieldArray
                            name="photos"
                            render={arrayHelpers => (
                        <>
                        <Dropzone  
                            accept="image/jpeg, image/png"
                            minSize={1024}
                            maxSize={3072000}
                            onDrop={(acceptedFiles) => {
                        // on drop we add to the existing files
                        setFieldValue("photos", values.photos.concat(acceptedFiles.map(file => Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        }))));
                        }}>
                                {({ getRootProps, getInputProps }) => (
                        <section className="container p-2 border-box">
                            <div {...getRootProps({ className: "dropzone text-center" })}>
                                <input name="file" {...getInputProps()} />
                                <div clasName="p-2 mx-auto">
                                    <AiFillFileImage className="my-auto h-12 w-12 m-auto"/>
                                    <div className="my-3 shadow-button rounded cursor-pointer hover:shadow-hover w-1/2 text-center m-auto p-1 "> Add Files </div>
                                </div>
                                <em className="text-xs text-Black-medium">(Include high-quality images of your work to attract more customers.)</em>
                            </div>
                        </section>
                    )}
                        </Dropzone>
                            <div className="px-4 my-2">
                            <strong>Files:</strong>
                            <ul className="list-disc my-2">
                                <aside style={thumbsContainer}>
                                    {values.photos?.map((data, i) => {
                                        return (
                                        <div style={thumb} key={data.name} className="relative">
                                            <div style={thumbInner}>
                                                <img
                                                alt="preview"
                                                src={data.preview ? data.preview : data.url }
                                                style={img}
                                                />
                                            </div>
                                            <div className=" absolute top-2 right-1 z-50">     
                                                <button
                                                    className="rounded-full w-5 h-5 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white"
                                                    onClick={ () => arrayHelpers.remove(i) }>
                                                    <AiOutlineClose className="w-3 h-3"/>
                                                </button>
                                            </div>
                                        </div>
                                        )
                                    })}
                                </aside>
                            </ul>
                            {errors.photos && (
                            <div className="input-feedback">{errors.photos}</div>
                            )}
                        </div>
                        </>
                        )}
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

export default withAuth(Profile);