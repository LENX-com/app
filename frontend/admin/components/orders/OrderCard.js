import React from 'react'
import Rating from 'react-rating'
import { MdStarBorder, MdStar} from 'react-icons/md'
import { Link } from 'react-router-dom'

const StoreCard = () => {
    return (
        <Link to = {`/marketplace/manufacturer/manufacturerId`}>
            <div className=" shadow-separator h-24 flex bg-white">
                <div className="my-auto w-2/5">
                    <div className="bg-cover bg-center shadow-button h-20 w-20 mx-3 my-auto rounded-sm bg-white" style= {{backgroundImage: "url(https://http2.mlstatic.com/D_Q_NP_871989-MLA25801430807_072017-T.webp)"}}/>
                </div>
                <div className="my-auto">
                    <div className=" text-lg font-bold my-auto">
                        Store Name
                    </div>
                    <div>
                        <Rating
                                className="mt-2 text-base text-orange"
                                emptySymbol= { <MdStarBorder/> }
                                fullSymbol= { <MdStar/> }
                                readonly
                                initialRating={4.5}
                                />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default StoreCard
