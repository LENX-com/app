import React from 'react'
import Card from '../Cards/Card'

const AddTitle = () => {
    return (
        <>
            <Card title="Add a title">
                <form className="w-full max-w-xl bg-white rounded-lg px-4 ">
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full md:w-full px-3 mb-2">
                            <textarea className="shadow-button rounded leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder="Describe your overall experience" required defaultValue={""} />
                        </div>
                        <div className="w-full md:w-full flex items-start md:w-full px-3">
                        </div>
                     </div>
                </form>
            </Card> 
        </>
    )
}

export default AddTitle
