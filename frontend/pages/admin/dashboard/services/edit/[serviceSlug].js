import React, { useState, useEffect } from 'react';
import { Formik, Field, FieldArray } from "formik";
import Dropzone from "react-dropzone";
import { AiFillFileImage, AiOutlineClose, AiFillTags } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import * as Yup from "yup";
import { Alert, Badge } from '@windmill/react-ui'
import Link from 'next/link'
import SectionTitle from "@/components/Typography/SectionTitle";
import { useDispatch, useSelector } from 'react-redux'
import { getSubs, getSubByCategory } from "@/redux/actions/subCategoryAction";
import Layout from '@/admin/containers/Layout'
import { Input, Label, Select } from '@windmill/react-ui'
import withAuth from '@/components/auth'
import {  getProduct, updateProduct } from "@/redux/actions/productAction";
import { getCategories} from "@/redux/actions/categoryAction";
import Card from '@/components/Cards/Card';
import Button from '@/components/Buttons/Button';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const EditProduct = ({}) => {
    const router = useRouter();
    const categories = useSelector((state) => state.category.categories);
    const { token, user } = useSelector((state) => state.auth);
    const singleProduct = useSelector((state) => state.product.product);
    const [ category, setCategory ] = useState('')
    const [ subs, setSubs ] = useState('')
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ isCreated, setIsCreated] = useState(false)
    const [ product, setProduct ] = useState('')
    const [ok, setOk] = useState(false)
    const [ isSaved, setIsSaved ] = useState(false)
    const { serviceSlug } = router.query
    

     const dispatch = useDispatch();

     //If the product is not saved it will prevent the user from closing the tab instantly
     if (!isSaved) {
         window.onbeforeunload = confirmExit;
         function confirmExit() {
            return "You have attempted to leave this page. Are you sure?";
        }
    }

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProduct(serviceSlug))
          setTimeout(() => {
            setOk(true)
            }, 500)
    }, [serviceSlug])

    useEffect(() => {
      if(category) {
    getSubByCategory(category).then((res) => setSubs(res.data));
      }
  }, [category]);

  const handleReset = (resetForm) => {
  if (window.confirm('Reset?')) {
    resetForm();
  }
};


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

const validatorForm = Yup.object().shape({
                 name: 
                    Yup.string()
                    .required("Required"),
                
                price:
                    Yup.number()
                    .required("Required")
                    .integer()
                    .min(1),

                subs:
                    Yup.string()
                    .required("Required"),

                status:
                    Yup.string()
                    .required("Required"),
                
                file: 
                    Yup.mixed()
                    .required("A file is required"),
                
                description:
                    Yup.string()
                    .required("Required"),

                tags:
                    Yup.array()
                        .required('Enter a Tag')
                        .min(1, 'Enter a Tag')
                        .max(4, 'You cannot enter more than four tags'),
              
            })


    return (
        <Layout>
        {/*
            Basically I am veryfying whether the single product loaded becomes true, then a settimeout function wchich will set out okay to true, once both conditions
            are true the function will render the form. The okay function delays the rendering in order to dispatch the newer product loaded, otherwise it will load the previous product and
            product from redux.

            Thanks for reading and peace
         
         */}

        { singleProduct && ok ? 
        <div className="lg:px-6">
        <div className="relative my-2 h-10 ">
            <div className=" absolute top-2 left-0 z-50">
                <div className="flex">
                    <button
                        className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
                        onClick={() => setTimeout(() => router.back(), 150)}>
                        <MdArrowBack className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
        <div className="px-2 mt-2 flex">
            <div>
                <SectionTitle> { singleProduct.name } </SectionTitle>
            </div>
            <div className="ml-3">
                <Badge type={ singleProduct.status === "active" ? `success` : 'warning' } className="capitalize"> { singleProduct.status } </Badge>
            </div>
        </div>
      <div className="container relative">
        <Formik
          initialValues={{
            name: singleProduct.name,
            price: singleProduct.price,
            subs: singleProduct.subs,
            status: singleProduct.status,
            category: singleProduct.category?._id,
            description: singleProduct.description,
            file: singleProduct.photo,
            tags: singleProduct.tags,
          }}

          validationSchema={validatorForm}
          validateOnChange={isSubmitting}
          validateOnBlur={isSubmitting}

          onSubmit= { async (values, {resetForm, validate}) => {
            
            let formData = new FormData();

        
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("subs", values.subs);
            formData.append("status", values.status);
            formData.append("category", values.category);
            formData.append("description", values.description);
            
            // we loop the tags array and assign a value to each task in the form, if any tag is undefined its value will not be looped.           
            for (let i = 0; i <= values.tags.length; i++) {
              values.tags[i] !== undefined && formData.append(`tags`, values.tags[i] );
            }

            for (let i = 0; i <= values.file.length; i++) {
              formData.append(`file`, values.file[i] );
                }

            dispatch(updateProduct( singleProduct._id, formData))
            setIsCreated(true)
            setIsSaved(true)

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
        
        const handleCategory = (e) => {
            setFieldValue("category", e.target.value)
            setCategory(e.target.value)
        }
        
         return (
            <form onSubmit={handleSubmit}>
                { isCreated && 
                    <div className ="absolute top-0 z-50 w-full">
                        <Alert className="w-full" type="success" onClose={() => setIsCreated(false)}>
                            Product created succesfuly
                            <div className="mt-2">
                                <Link href="/admin/dashboard" className="underline"> Go back to dashboard </Link> 
                            </div>
                        </Alert>
                    </div>
                }
             <div className="lg:grid lg:grid-cols-3 gap-4 mb-8">
                    <Card className="lg:col-span-2">
                        <div className="mb-4">
                        <Label>
                            <span className="text-base font-medium"> Add Title </span>
                            <Input 
                                valid
                                className={`mt-1 p-2 rounded-md shadow-button`}
                                id="name"
                                name="name" 
                                type="text"
                                value={values.name}
                            onChange={handleChange} />
                        </Label>
                        {errors.name && (
                        <div className="input-feedback">{errors.name}</div>
                        )}
                    </div>
                    <div className="my-2">
                        <span className="text-base font-medium p-2"> Add Description </span>
                        <Field name="description">
                            {({ field }) => <ReactQuill className="products" value={field.value} onChange={field.onChange(field.name)} />}
                        </Field>
                        {errors.description && (
                            <div className="input-feedback">{errors.description}</div>
                        )}
                    </div>
                </Card>
   
                <div>
                    <Card title="Pricing" className="">
                        <div className="mb-4">
                            <Label valid={errors.price}>
                                <span className="text-base font-medium"> Pricing </span>
                                <div className="relative">
                                    <span className="input-symbol"> £ </span>
                                    <Input className="mt-1 p-2 rounded-md shadow-button pl-6" type="number" id="price" name="price" min="1" 
                                    value={values.price} onChange={handleChange} />
                                </div>
                            </Label>
                        {errors.price && (
                            <div className="input-feedback">{errors.price}</div>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="bg-white rounded-sm shadow-button relative my-2 lg:col-span-2">
                    <div className="px-3 py-1">
                        <SectionTitle> Product Details</SectionTitle>
                    </div>
                    <div className="shadow-separator px-3 py-2">
                        <Label className="mb-3">
                            <span> Product Status </span>
                            <Select className="Selection mt-1 p-2 rounded-md shadow-button bg-white capitalize"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                <option value="" label="Select a Status ">
                                    Select a Status
                                </option>
                                <option value="active" label="active">
                                    Active
                                </option>

                                <option value="draft" label="draft">
                                    Draft
                                </option>

                                <option value="inactive" label="inactive">
                                    Inactive
                                </option>
                            </Select>
                        </Label>
                        {errors.status && (
                        <div className="input-feedback">{errors.status}</div>
                        )}
                    </div>

                    <div className="shadow-separator px-3 py-3">
                        <Label className="my-2">
                            <span> Category </span>
                            <Select className="Selection mt-1 p-2 rounded-md shadow-button bg-white capitalize" name="category" id="category"
                                        value={values.category}
                                        onChange={handleCategory}>

                                <option value="" label="Select a Category ">
                                    Select a Category 
                                </option>           
                                { categories &&
                                    categories.map((c, i) => (
                                    <option className="px-2" key={i} value={c._id}>
                                        {c.name}
                                    </option>
                                    ))}
                            </Select>
                            {errors.category && (
                            <div className="input-feedback">{errors.category}</div>
                            )}
                        </Label>
                        {errors.category && (
                            <div className="input-feedback">{errors.category}</div>
                            )}
                        
                    <Label className="my-3">
                        <span> Subcategory </span>
                        <Select className="Selection mt-1 p-2 rounded-md shadow-button bg-white capitalize" name="subs" id="subs"
                                value={values.subs}
                                onChange={handleChange}>

                                <option value="" label="Select Subacategory">
                                    Select Subacategory
                                </option> 
                                { subs && subs.map( (sub, i ) => (
                                <option className="px-2" key={i} value={sub._id}>
                                    {sub.name}
                                </option>
                                ))}
                        </Select>
                    </Label>
                    {errors.subs && (
                        <div className="input-feedback">{errors.subs}</div>
                        )}
                    </div>

                    <div className='mt-5 px-3 pb-5'>
                        <span className="text-base font-medium"> Add or change tags (up to 4) so buyers know more about your product </span>
                            <div className="Form">
                                <div className="TagForm mt-3">
                                    <AiFillTags className="InputIcon text-lg mx-2" />
                                    <input
                                        className="p-2"
                                        type="text"
                                        placeholder="Add a tag..."
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                values.tags.length < 4 && event.target.value !== "" && setFieldValue( "tags" ,[...values.tags, event.target.value]);
                                                event.target.value = "";
                                            }
                                        }}
                                    />
                                </div>
                                <ul className="TagList">
                                    {values.tags && values.tags.map((tag, i) => (
                                        <li 
                                            className="Tag capitalize mb-5"
                                            key={i}    
                                        >
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
                        {errors.tags && (
                            <div className="input-feedback -m-mt-2">{ errors.tags }</div>
                    )}
                        </div>
                </div>

                <div>
                    <Card title="Add Media" className="lg:col-span-1">
                        <FieldArray
                            name="file"
                            render={arrayHelpers => (
                        <>
                        <Dropzone  
                            accept="image/jpeg, image/png"
                            minSize={1024}
                            maxSize={3072000}
                            onDrop={(acceptedFiles) => {
                        // on drop we add to the existing files
                        setFieldValue("file", values.file.concat(acceptedFiles.map(file => Object.assign(file, {
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
                                <em className="text-xs text-Black-medium">(Include a high-quality image in the product to attract more customers.)</em>
                            </div>
                        </section>
                    )}
                        </Dropzone>
                            <div className="px-4 my-2">
                            <strong>Files:</strong>
                            <ul className="list-disc my-2">
                                <aside style={thumbsContainer}>
                                    {values.file?.map((data, i) => {
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
                            {errors.file && (
                            <div className="input-feedback">{errors.file}</div>
                            )}
                        </div>
                        </>
                        )}
                        />
                    </Card>
                </div>

            </div>
                    <div className="w-full fixed bottom-0 border-t-2 mobile:bg-white border-Grey lg:relative lg:mb-10" style={{zIndex:'1000'}}>
                        <div className="flex my-2 px-3 m-auto">
                            <Button className="bg-Black text-white w-3/5 ml-3" type="submit" onClick={() => setIsSubmitting(true)}>
                                Save Product
                            </Button>
                        </div>
                    </div>

            </form>
    
      )} 
    }
    
    </Formik>
    
    </div>
    </div>
    : null 
    }
    </Layout>
    )};

export default withAuth(EditProduct)


    