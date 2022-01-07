import React from 'react'
import OrderStatus from '../components/orders/OrderStatus'
import PageTitle from '../components/Typography/PageTitle'

const FindStatusOrder = () => {
    return (
        <>
           <PageTitle> My orders </PageTitle>
           <OrderStatus/>
        </>
    )
}

export default FindStatusOrder
