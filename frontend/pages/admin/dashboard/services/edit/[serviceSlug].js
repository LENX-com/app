import React, { useState, useEffect, Fragment } from 'react';
import { Formik, Field, FieldArray } from "formik";
import Dropzone from "react-dropzone";
import { AiFillFileImage, AiOutlineClose, AiFillTags } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import * as Yup from "yup";
import { Alert, Badge } from '@windmill/react-ui'
import Link from 'next/link'
import SectionTitle from "@/components/Typography/SectionTitle";
import { useDispatch, useSelector } from 'react-redux'
import { HiCheck, HiSelector }  from "react-icons/hi";
import { getSubs, getSubByCategory } from "@/redux/actions/subCategoryAction";
import Layout from '@/admin/containers/Layout'
import { Listbox, Transition } from '@headlessui/react'
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

    const status = ["active", "inactive", "draft"]
    

     const dispatch = useDispatch();

     //If the product is not saved it will prevent the user from closing the tab instantly
    //  if (!isSaved) {
    //      window.onbeforeunload = confirmExit;
    //      function confirmExit() {
    //         return "You have attempted to leave this page. Are you sure?";
    //     }
    // }

    useEffect(() => {
        dispatch(getCategories())
          setTimeout(() => {
            setOk(true)
            }, 500)
    }, [])

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProduct(serviceSlug))
    }, [serviceSlug])

    useEffect(() => {
        if(category) {
            setCategory(singleProduct.category._id)
        }
    }, [singleProduct]);

    useEffect(() => {
      if(category) {
    getSubByCategory(category._id).then((res) => setSubs(res.data));
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

const title = "text-lg font-bold text-Black-medium pb-1";

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
                    Yup.mixed()
                    .required("A subcategory is required"),
                
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
      <div className= "container relative">
        <Formik
          initialValues={{
            name: singleProduct.name,
            price: singleProduct.price,
            subs: singleProduct.subs.toString(),
            status: singleProduct.status,
            category: singleProduct.category,
            description: singleProduct.description,
            file: singleProduct.photo,
            tags: singleProduct.tags,
          }}

          validationSchema= { validatorForm }
          validateOnChange= { isSubmitting }
          validateOnBlur= { isSubmitting }

          onSubmit= { async (values, {resetForm, validate}) => {
            
            let formData = new FormData();

                // to add current file and remove the ones that are not included anymore
            var currentPhoto = []
            for (let i = 0; i <= values.file.length; i++) {
                values.file[i] !== undefined && currentPhoto.push({
                    url: values.file[i].url,
                    id: values.file[i]._id,
                    public_id: values.file[i].public_id
                });
                }
            formData.append("currentPhoto", JSON.stringify(currentPhoto))
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("subs", values.subs._id ? values.subs._id : values.subs);
            formData.append("status", values.status);
            formData.append("category", values.category._id);
            formData.append("description", values.description);
            
            // we loop the tags array and assign a value to each task in the form, if any tag is undefined its value will not be looped.           
            for (let i = 0; i <= values.tags.length; i++) {
              values.tags[i] !== undefined && formData.append(`tags`, values.tags[i] );
            }

            for (let i = 0; i <= values.file.length; i++) {
              formData.append( `file`, values.file[i] );
                }

            dispatch( updateProduct( singleProduct._id, formData) )
            router.replace("/admin/dashboard/services")

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
            setFieldValue("category", e)
            setCategory(e)
        }
        
        const handleSub = (e) => {
            setFieldValue("subs", e)
        }

        console.log("values.subs", values.subs)

        return (
            <form onSubmit={handleSubmit}>
                { isCreated && 
                    <div className ="absolute top-0 z-50 w-full rounded-md bg-green-300">
                        <Alert className="w-full" type="success" onClose={() => setIsCreated(false)}>
                            Product updated succesfuly
                            <div className="mt-2">
                                <Link href="/admin/dashboard" className="underline"> Go back to dashboard </Link> 
                            </div>
                        </Alert>
                    </div>
                }
             <div className="">
                    <Card className="">
                        <div className="my-8">
                            <h2 className={title}> Add Title </h2>
                            <div className={`rounded-md border-box`}>
                                <input 
                                    valid
                                    className={`focus:outline-none focus:ring focus:border-blue-500 w-full rounded-[12px] p-3`}
                                    id="name"
                                    name="name" 
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange} 
                                />
                            </div>
                        {errors.name && (
                        <div className="input-feedback">{errors.name}</div>
                        )}
                    </div>
                    <div className="my-2">
                        <span className={title}> Add Description </span>
                        <Field name="description">
                            {({ field }) => <ReactQuill className="products" value={field.value} onChange={field.onChange(field.name)} />}
                        </Field>
                        {errors.description && (
                            <div className="input-feedback">{errors.description}</div>
                        )}
                    </div>

                    <div className="">
                        <h2 className={title}> Pricing </h2>
                        <div className="relative focus:outline-none focus:ring focus:border-blue-500 w-full border-box px-3">
                            <span className="input-symbol"> £ </span>
                            <div className=" pl-6">
                                <input 
                                        type="number" 
                                        id="price" 
                                        name="price" 
                                        min="1" 
                                        value={values.price} 
                                        onChange={handleChange}
                                        className="w-full p-2 focus:outline-none focus:ring focus:border-blue-500"
                                
                                />
                            </div>
                        </div>
                    {errors.price && (
                        <div className="input-feedback">{errors.price}</div>
                        )}
                    </div>
                     <div className="my-8">
                        <h2 className={title}> Status </h2>
                        <Listbox value={status} onChange={(e) => { 
                                                                        setFieldValue("status", e)
                                                                }}>
                        <div className="relative mt-1">
                        <Listbox.Button className=" p-3 focus:outline-none focus:ring focus:border-blue-500 relative w-full text-left border-box cursor-pointer ">
                            <span className="block truncate capitalize">{values.status}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <HiSelector
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md z-50 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {status.map((status, categoryIdx) => (
                                <Listbox.Option
                                key={categoryIdx}
                                className={({ active }) =>
                                    `${active ? 'text-blue-600 bg-blue-200' : 'text-black'}
                                        select-none relative py-2 pl-10 pr-4 cursor-pointer`
                                }
                                value={status}
                                >
                                {({ selected, active }) => (
                                    <>
                                    <span
                                        className={`${
                                        selected ? 'font-medium' : 'font-normal'
                                        } block truncate capitalize`}
                                    >
                                        {status}
                                    </span>
                                    {selected ? (
                                        <span
                                        className={`${
                                            active ? 'text-blue-600' : 'text-blue-300'
                                        }
                                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                        >
                                        <HiCheck className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                        </div>
                    </Listbox>
                        {errors.status && (
                            <div className="input-feedback">{errors.status}</div>
                        )}
                    </div>
                     <div className="my-8">
                        <h2 className={title}> Category </h2>
                        <Listbox value={values.category} onChange={handleCategory}>
                        <div className="relative mt-1">
                        <Listbox.Button className=" p-3 focus:outline-none focus:ring focus:border-blue-500 relative w-full text-left border-box cursor-pointer ">
                            <span className="block truncate">{values.category.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <HiSelector
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md z-50 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {categories.map((category, categoryIdx) => (
                                <Listbox.Option
                                key={categoryIdx}
                                className={({ active }) =>
                                    `${active ? 'text-blue-600 bg-blue-200' : 'text-black'}
                                        select-none relative py-2 pl-10 pr-4 cursor-pointer`
                                }
                                value={category}
                                >
                                {({ selected, active }) => (
                                    <>
                                    <span
                                        className={`${
                                        selected ? 'font-medium' : 'font-normal'
                                        } block truncate`}
                                    >
                                        {category.name}
                                    </span>
                                    {selected ? (
                                        <span
                                        className={`${
                                            active ? 'text-blue-600' : 'text-blue-300'
                                        }
                                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                        >
                                        <HiCheck className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                        </div>
                    </Listbox>
                        {errors.category && (
                            <div className="input-feedback">{errors.category}</div>
                        )}
                    </div>

                    <div className="my-8">
                        <h2 className={title}> Subcategory </h2>
                        <Listbox value={values.subs} onChange={handleSub}>
                        <div className="relative mt-1">
                        <Listbox.Button className=" p-3 focus:outline-none focus:ring focus:border-blue-500 relative w-full text-left border-box cursor-pointer ">
                            <span className="block truncate">{values.subs.name ? values.subs.name : "Please select a category"}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <HiSelector
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md z-50 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {subs && subs.map((sub, subIdx) => (
                                <Listbox.Option
                                key={subIdx}
                                className={({ active }) =>
                                    `${active ? 'text-blue-600 bg-blue-200' : 'text-black'}
                                        cursor-pointer select-none relative py-2 pl-10 pr-4`
                                }
                                value={sub}
                                >
                                {({ selected, active }) => (
                                    <>
                                    <span
                                        className={`${
                                        selected ? 'font-medium' : 'font-normal'
                                        } block truncate`}
                                    >
                                        {sub.name}
                                    </span>
                                    {selected ? (
                                        <span
                                        className={`${
                                            active ? 'text-blue-600' : 'text-blue-300'
                                        }
                                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                        >
                                        <HiCheck className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                        </div>
                    </Listbox>
                        {errors.subs && (
                            <div className="input-feedback">{errors.subs}</div>
                        )}
                    </div>
                    <div className='my-8'>
                        <h2 className={title}> Skills</h2>
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

                    <div className="my-8">
                        <h2 className={title}> Media</h2>
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
                        <section className="container p-2 border-box lg:w-3/5">
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
                    </div>
                </Card>
   


                



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


    