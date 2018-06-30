import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import arrowRight from '../assets/img/icon-arrow-right.svg'

const byOrder = (prev, next) =>
  prev.node.frontmatter.order - next.node.frontmatter.order

export default class Listing extends React.Component {
  render() {
    let { data } = this.props

    console.log(data)

    let listing = data
      .sort(byOrder)
      .filter(({ node }) => {
        if (this.props.skip === true) {
          return data[0].node !== node
        } else {
          return node
        }
      })
      .map(({ node }, index) => (
        <section className="listing" key={index}>
          <article className="card" key={node.id}>
            <Img sizes={node.frontmatter.cover_image.childImageSharp.sizes} />

            <div className="content">
              <Link className="link" to={node.fields.slug}>
                <p className="tags">Music Video / Cinematography</p>
                <h3 className="title">{node.frontmatter.title}</h3>
              </Link>

              <p className="excerpt">{node.excerpt}</p>
            </div>
          </article>
        </section>
      ))

    return <div className="listings container col">{listing}</div>
  }
}
