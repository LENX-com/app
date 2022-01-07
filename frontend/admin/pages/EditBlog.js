import React, { useState, useEffect } from 'react';
import { Formik, Field, useFormikContext } from "formik";
import Dropzone from "react-dropzone";
import { AiFillFileImage, AiOutlineClose, AiFillTags } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import * as Yup from "yup";
import { Alert } from '@windmill/react-ui'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory, useRouteMatch, Prompt } from "react-router-dom";
import SectionTitle from "../components/Typography/SectionTitle";
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux'
import { getPostAdmin, editPost } from "../../actions/postAction";
import { addPost } from "../../actions/postAction";
import { Input, Label, Select } from '@windmill/react-ui'
import _ from 'lodash'
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button';
import '../styles/Form.scss'
import 'react-quill/dist/quill.snow.css';



const EditBlog = ({match}) => {
    const history = useHistory();
    const blog = useSelector((state) => state.admin.singleBlog);
    const [ category, setCategory ] = useState('')
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ isCreated, setIsCreated] = useState(false)
    const [ ok, setOk ] = useState(false)
    
        const PromptIfDirty = () => {
        const formik = useFormikContext();
        return (
            <Prompt
            when={formik.dirty && formik.submitCount === 0}
            message="Are you sure you want to leave? You have with unsaved changes."
            />
        );
        };

     const dispatch = useDispatch();
     

     useEffect(() => {
        dispatch(getPostAdmin(match.params.blogId))
          setTimeout(() => {
            setOk(true)
            }, 500)
     }, [])


    const BlogCreated = () => (
        <div className ="absolute top-0 z-50 w-full">
            <Alert className="w-full" type="success" onClose={() => setIsCreated(false)}>
                Blog created succesfuly
                <div className="mt-2">
                    <Link to="/admin/dashboard" className="underline"> Go back to dashboard </Link> 
                </div>
            </Alert>
        </div>
    )

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
                 text: 
                    Yup.string()
                    .required("Required"),

                title:
                    Yup.string()
                    .required("Required"),
                
                
                tags:
                    Yup.array()
                        .required('Enter a Tag')
                        .min(1, 'Enter a Tag')
                        .max(4, 'You cannot enter more than four tags')
            })


    return (
    <>
        <div className="relative my-2 h-10 ">
            <div className=" absolute top-2 left-0 z-50">
                <div className="flex">
                    <button
                        className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
                        onClick={() => setTimeout(() => history.goBack(), 150)}>
                        <MdArrowBack className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
        <div className="px-2 mt-2">
            <SectionTitle> Edit blog post </SectionTitle>
        </div>

        {/* When the blog is dispatch we wait until the respinse is okay then we set the state to okay
            once both conditions are true then we render the blog, otherwise it will load the blog from the previous state  */}

      { blog && ok && 
      <div className="container relative">
        <Formik
          initialValues={{
            title: blog.title,
            text: blog.text,
            file: [],
            status: blog.status,
            tags: blog.tags,
          }}

          validationSchema={validatorForm}
          validateOnChange={isSubmitting}
          validateOnBlur={isSubmitting}

          onSubmit= { async (values, {resetForm, validate}) => {


            let formData = new FormData();

            formData.append("title", values.title);
            formData.append("text", values.text);
            formData.append("category", values.category);

            // we loop the tags array and assign a value to each task in the form, if any tag is undefined its value will not be looped.           
            for (let i = 0; i <= values.tags.length; i++) {
              values.tags[i] !== undefined && formData.append(`tags`, values.tags[i] );
            }

            for (let i = 0; i <= values.file.length; i++) {
              formData.append(`file`, values.file[i] );
            }

            dispatch(editPost(blog._id, formData))
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

        console.log(dirty)
        
        const handleCategory = (e) => {
            setFieldValue("category", e.target.value)
            setCategory(e.target.value)
        }

        
         return (
            <form onSubmit={handleSubmit} >
                
                { isCreated && 
                    <BlogCreated />
                }
                <PromptIfDirty />

                <div className="grid grid-cols-3 gap-4 mb-4 mobile:grid-cols-1 mobile:pb-10">
                    <Card className="col-span-2 lg:rounded-sm mobile:col-span-1">
                        <div className="mb-4">
                            <Label>
                                <span className="text-base font-medium"> Add Title </span>
                                <Input 
                                    valid
                                    className={`mt-1 p-2 rounded-md shadow-button`}
                                    id="title"
                                    name="title" 
                                    type="text"
                                    placeholder = " Your blog title "
                                    value={values.title}
                                onChange={handleChange} />
                            </Label>
                            {errors.title && (
                            <div className="input-feedback">{ errors.title }</div>
                            )}
                        </div>
                        <div className="my-2">
                            <Field name="text">
                                {({ field }) => <ReactQuill value={field.value} onChange={field.onChange(field.name)}  />}
                            </Field>
                            {errors.text && (
                                <div className="input-feedback">{errors.text}</div>
                            )}
                        </div>
                    </Card>

                    <Card className="lg:rounded-sm">
                        <span className="text-base font-medium my-2"> Blog preview </span>

                    { values.file.length < 1 &&
                        <Dropzone  
                            accept="image/jpeg, image/png"
                            minSize={1024}
                            maxSize={3072000}
                            multiple = {false }
                            onDrop={(acceptedFiles) => {
                        // on drop we add to the existing files
                        setFieldValue("file", values.file.concat(acceptedFiles.map(file => Object.assign(file, {
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
                                <em className="text-xs text-Black-medium">(Include a high-quality image in your story to make it more inviting to readers.)</em>
                            </div>
                        </section>
                    )}
                        </Dropzone>
                    }

                            <div className="px-4 my-2">
                            { values.file.length > 0 && <strong>File:</strong>}
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
                        
                         
                            <div className='mt-4'>
                                <span className="text-base font-medium"> Add or change tags (up to 4) so readers know what your story is about </span>
                                <div className="Form">
                                    <div className="TagForm mt-3">
                                    <AiFillTags className="InputIcon text-lg mx-2" />
                                    <input
                                        className="p-2"
                                        type="text"
                                        placeholder="Add a tag..."
                                        onKeyPress={event => {
                                        
                                        if ( event.key === "Enter") {
                                            event.preventDefault();
                                            values.tags.length < 4 && setFieldValue( "tags" ,[...values.tags, event.target.value]);
                                            event.target.value = "";
                                        }
                                        }}
                                        autofocus
                                    />
                                    </div>
                                    <ul className="TagList">
                                    {values.tags && values.tags.map(tag => (
                                        <li className="Tag capitalize">
                                        {tag}
                                        <AiOutlineClose
                                            className="TagIcon text-lg ml-2"
                                            onClick={() => {
                                            setFieldValue("tags", [...values.tags.filter(word => word !== tag)]);
                                            }}
                                        />
                                        </li>
                                    ))}
                                    </ul>
                                 </div>
                            </div>
                            
                            {errors.tags && (
                            <div className="input-feedback -m-mt-2">{ errors.tags }</div>
                            )}




                        <div className="mobile:hidden absolute bottom-4 right-4">
                            <Button disabled = { _.isEmpty(values.title && values.text) }
                                    className= {`bg-Black text-white ${ _.isEmpty(values.title && values.text) && 'bg-opacity-40 cursor-text' }`}
                                    type="submit" 
                                    onClick={() => setIsSubmitting(true)}
                            >
                               Update
                            </Button>
                        </div>
                    </Card>


                <div className="w-full fixed bottom-0 border-t-2 border-Grey bg-white z-50 lg:hidden">
                    <div className="flex my-2 p-3">
                        <Button type="button">
                            Cancel
                        </Button>
                        <Button
                                disabled = { !dirty }
                                className= {`bg-Black text-white w-3/5 ml-3  ${!dirty && 'bg-opacity-40 cursor-text' }`} type="submit" onClick={() => setIsSubmitting(true)}>
                            Save Blog post
                        </Button>
                    </div>
                </div>

                </div>
            </form>
    
      )} 
    }
    
    </Formik>
    
    </div>
    }
    </>
    
    )};

    EditBlog.propTypes = {
        editPost: PropTypes.func.isRequired
    };

export default connect(
  null,
  { editPost }
)(EditBlog);


    