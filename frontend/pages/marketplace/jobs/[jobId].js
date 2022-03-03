import React, { useEffect } from 'react'
import Layout from '@/containers/Layout'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { jobById } from '@/redux/actions/jobsAction'
import parse from 'html-react-parser';
import Button from '@/components/Buttons/Button'

const jobId = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { jobId } = router.query;
    const { job } = useSelector((state) => state.jobs);

    useEffect(() => {
        jobId && dispatch(jobById(jobId))
    }, [ jobId ])

    return (
        <Layout>
            { job && (
                <>
                    <div className=" lg:my-12 lg:w-4/6">
                        <div className="bg-white mobile:px-4 mobile:mx-auto mobile:py-6 mobile:min-h-screen">
                            <div> 
                                <div className="mb-4">
                                    <h1 className="text-xl font-bold text-Black-title mb-1"> { job.title } </h1>
                                    <p className="text-Black-text"> { parse( job.description ) } </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sticky bottom-0 w-full z-50">
                        <Button className="bg-orange text-white"> Apply </Button>
                    </div>
                </>
            )}
        </Layout> 
    )
}

export default jobId
   