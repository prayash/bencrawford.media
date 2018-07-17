import React from 'react'
import Link from 'gatsby-link'
import capitalizeFirstLetter from '../helpers/uppercase'
import Listing from '../components/listing'

const Motion = ({ data, pathContext }) => {
  const { group } = pathContext

  return (
    <div className="gallery--motion">
      <Listing data={group} />
    </div>
  )
}

export default Motion
