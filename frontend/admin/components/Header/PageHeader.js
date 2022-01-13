import React from 'react'
import { MdArrowBack } from "react-icons/md";
import { useRouter } from 'next/router'
import PageTitle from '@/components/Typography/PageTitle'

const PageHeader = ({title}) => {

    const router = useRouter();
    return (
        <>
            <div className="relative my-2 mobile:h-10 lg:mt-4">
                <div className=" absolute top-2 left-0 z-50 lg:hidden">
                    <div className="flex">
                        <button
                            className="rounded-full w-8 h-8 bg-Grey-light p-0 border-0 inline-flex items-center justify-center text-white ml-4"
                            onClick={() => setTimeout(() => router.back(), 150)}>
                            <MdArrowBack className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="px-2 mt-2">
                <PageTitle> {title} </PageTitle>
            </div>
        </>
    )
}

export default PageHeader
