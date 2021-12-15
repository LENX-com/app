import React from 'react'
import { Card, CardBody, Button } from '@windmill/react-ui'

function InfoCard({ title, value, children: icon, button }) {
  return (
    <Card className="card-item">
      <CardBody className="flex items-center">
        {icon}
        <div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</p>
          <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">{value}</p>
          { button ? <Button size="regular"> {button} </Button> : null }
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard