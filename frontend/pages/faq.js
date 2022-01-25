import React from 'react'
import { Up } from '@/marketplace/assets/icons'
import { Disclosure } from '@headlessui/react'
import Layout from '@/containers/Layout'


const faq = () => {
    return (
        <Layout>
            { /* strips design  */}
                {/* <div className="SupportSite-BackgroundStripes z-50">
                    <div className="SupportSite-BackgroundStripes-Stripe-1" />
                    <div className="SupportSite-BackgroundStripes-Stripe-2" />
                    <div className="SupportSite-BackgroundStripes-Stripe-3" />
                </div> */}
            {/*  */}
            <div className="my-2">
                <div className="border-t border-b border-Grey-border">
                    <Disclosure>
                        {({open}) => (
                        <>
                        <Disclosure.Button className="py-2 flex justify-between w-full">
                            <span className="text-black font-bold my-auto text-base"> Rating </span>
                            <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                <Up
                                    className={`${
                                    open ? '' : 'transform rotate-180'
                                } text-lg text-Black-medium m-auto font-bold`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 p-3">
                            asda
                        </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                </div>
            </div>
        </Layout>
    )
}

export default faq
