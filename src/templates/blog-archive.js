import React from 'react'
import Link from 'gatsby-link'
import capitalizeFirstLetter from '../helpers/uppercase'
import Listing from '../components/listing'

const NavLink = props => {
  if (!props.test) {
    return (
      <Link to={props.url} className="btn">
        {props.text}
      </Link>
    )
  } else {
    return <span className="btn disabled gray">{props.text}</span>
  }
}

const IndexPage = ({ data, pathContext }) => {
  const { group, index, first, last, pageCount, pathPrefix } = pathContext
  const previousUrl = index - 1 == 1 ? '' : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <div className="BlogArchive">
      <header className="container title">
        {/* <h1>{capitalizeFirstLetter(pathPrefix)} archive</h1> */}
      </header>

      <Listing loop={group} />
    </div>
  )
}

export default IndexPage
