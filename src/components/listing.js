import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import arrowRight from '../assets/img/icon-arrow-right.svg'

export default props => {
  const links = {
    blog: 'Read post',
    stills: 'View collection'
  }

  let listing = props.loop
    .filter(({ node }) => {
      if (props.skip === true) {
        return props.loop[0].node !== node
      } else {
        return node
      }
    })
    .map(({ node }, index) => (
      <section className="col" key={index}>
        <article className="card small" key={node.id}>
          <figure>
            <Img sizes={node.frontmatter.cover_image.childImageSharp.sizes} />
          </figure>
          <div className="content">
            <Link to={node.fields.slug}>
              <h3 className="title">{node.frontmatter.title}</h3>
            </Link>
            <p className="excerpt">{node.excerpt}</p>

            <aside className="meta">
              <Link to={node.fields.slug} className="Link">
                {node.frontmatter.section
                  ? links[node.frontmatter.section]
                  : 'See post'}
                <img src={arrowRight} className="icon arrow right" />
              </Link>
              <span className="date">{node.frontmatter.date}</span>
            </aside>
          </div>
        </article>
      </section>
    ))

  return <section className="container row">{listing}</section>
}
