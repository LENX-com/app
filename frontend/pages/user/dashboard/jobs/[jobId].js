import React, { useState, useEffect, Fragment } from 'react';
import { Formik, Field, FieldArray } from "formik";
import Dropzone from "react-dropzone";;
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { HiCheck, HiSelector }  from "react-icons/hi";
import { getSubs, getSubByCategory } from "@/redux/actions/subCategoryAction";
import { jobById, updateJob } from "@/redux/actions/jobsAction";
import Layout from '@/dashboard/containers/Layout'
import { Listbox, Transition } from '@headlessui/react'
import PageHeader from '@/admin/components/Header/PageHeader'
import withAuth from '@/components/auth'
import { getCategories} from "@/redux/actions/categoryAction";
import Card from '@/components/Cards/Card';
import Button from '@/components/Buttons/Button';
import  { getLocations } from '@/redux/actions/productAction'
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const EditJob = () => {
    const router = useRouter();
    const [ category, setCategory ] = useState('')
    const [ subs, setSubs ] = useState('')
    const categories = useSelector((state) => state.category.categories);
    const { locations } = useSelector((state) => state.locations);
    const { job } = useSelector((state) => state.jobs);
    const { jobId } = router.query

    console.log("job", job)
    const dispatch = useDispatch()
    
    useEffect(() => {
        getLocations();
    }, [ ])

    useEffect(() => {
        if ( jobId ) {
            dispatch( jobById( jobId ) )
        }
        dispatch( getCategories() )
    }, [ jobId ])
     

    const title = "text-lg font-bold text-Black-medium pb-1";

    const validatorForm = Yup.object().shape({
                title: 
                    Yup.string()
                    .required("Required"),
                description: 
                    Yup.string()
                    .required("Required"),
                budget: 
                    Yup.string()
                    .required("Required"),
                category:
                    Yup.mixed()
                    .required("A category is required"),
                location:
                    Yup.mixed()
                    .required("A location is required"),
    })

    return (
        <Layout>
            <PageHeader title="Add Job" />
            <Formik
                initialValues={{ 
                    title: job?.title,
                    description: job?.description,
                    location: locations[0],
                    budget: job?.budget,
                    category: categories[0],
                }}
                validationSchema={validatorForm}
                onSubmit= { async (values, {resetForm, validate}) => {
                     let formData = {
                        title: values.title,
                        description: values.description,
                        budget: values.budget,
                        location: values.location._id,
                        category: values.category,
                    } 
 
                    dispatch( updateJob( jobId, formData ) )

            }}>
               
            { ( formik ) => {
             const {
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
        } = formik;

        const handleCategory = (e) => {
            setFieldValue("category", e)
            setCategory(e)
        }
        const handleSub = (e) => {
            setFieldValue("subs", e)
        }
          return ( 
            <form onSubmit= { handleSubmit } className="bg-white border-box p-3 mt-3 lg:mb-16">
                <div className="my-8">
                    <h2 className= { title }> Add Title </h2>
                    <div className= { `rounded-md border-box` }>
                    <input 
                        id="title"
                        name="title" 
                        type="text"
                        value= { values.title }
                        onChange= { handleChange }
                        className="focus:outline-none focus:ring focus:border-blue-500 w-full rounded-[12px] p-3 "
                    />
                    </div>
                    { errors.title && (
                        <div className="input-feedback"> { errors.title } </div>
                    )}
                </div>

                <div className="my-8">
                    <span className={title}> Add Description </span>
                    <Field name="description">
                        {({ field }) => <ReactQuill className="products" value={field.value} onChange={field.onChange(field.name)} />}
                    </Field>
                    {errors.description && (
                        <div className="input-feedback"> { errors.description } </div>
                    )}
                </div>
                <div className="my-8">
                    <h2 className= { title }> Budget </h2>
                    <div className="relative focus:outline-none focus:ring focus:border-blue-500 w-full border-box px-3">
                        <span className="input-symbol"> £ </span>
                        <div className=" pl-6"
                        >
                            <input 
                                type="number" 
                                id="budget" 
                                name="budget" 
                                min="1" 
                                value= { values.budget } 
                                onChange= { handleChange }
                                className="w-full p-2 focus:outline-none focus:ring focus:border-blue-500"
                            
                            />
                        </div>
                    </div>
                    { errors.budget && (
                        <div className="input-feedback"> { errors.budget } </div> 
                    )}
                </div>
                <div className="my-8">
                   <h2 className={title}> Category </h2>
                   <Listbox value={values.category} onChange={ handleCategory }>
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
                { errors.category && (
                    <div className="input-feedback"> { errors.category } </div>
                )}
            </div>

            <div className="my-8">
               <h2 className= { title }> Location </h2>
               <Listbox value= { values.location } onChange= { (e)=> setFieldValue("location", e ) }>
               <div className="relative mt-1">
                    <Listbox.Button type="button" className=" p-3 focus:outline-none focus:ring focus:border-blue-500 relative w-full text-left border-box cursor-pointer z-50">
                        <span className="block truncate"> { values.location.location } </span>
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
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white mb-6 rounded-md z-50 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {locations.map((location, locationIdx) => (
                            <Listbox.Option
                            key={locationIdx}
                            className={({ active }) =>
                                `${active ? 'text-blue-600 bg-blue-200' : 'text-black'}
                                    select-none relative py-2 pl-10 pr-4 cursor-pointer`
                            }
                            value={location}
                            >
                            {({ selected, active }) => (
                                <>
                                <span
                                    className={`${
                                    selected ? 'font-medium' : 'font-normal'
                                    } block truncate`}
                                >
                                    {location.location}
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
                                ) : null }
                                </>
                            )}
                            </Listbox.Option>
                        ))}
                        </Listbox.Options>
                    </Transition>
                </div> 
                </Listbox>
                { errors.location && (
                    <div className="input-feedback"> { errors.location } </div>
                )}
            </div>

            <div className="w-full fixed bottom-0 mobile:bg-white  lg:relative lg:mb-10">
                <div className="flex my-2 px-3 m-auto">
                    <Button className="bg-Black text-white w-3/5 ml-3" type="submit">
                        Save Job
                    </Button>
                </div>
            </div>
        </form>
          )} 
        }
        </Formik>
    </Layout>
    )
}

export default withAuth( EditJob )
