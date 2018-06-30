import React from 'react'
import Link from 'gatsby-link'
import capitalizeFirstLetter from '../helpers/uppercase'
import Listing from '../components/listing'

const Motion = ({ data, pathContext }) => {
  const { group, index, first, last, pageCount, pathPrefix } = pathContext
  const previousUrl = index - 1 == 1 ? '' : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <div className="gallery--motion">
      <header className="header">
        <Link to={'/'}>
          <h1 className="heading">Ben Crawford Media / Motion</h1>
        </Link>
      </header>

      <Listing data={group} />
    </div>
  )
}

export default Motion
