import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import nicetime from '../helpers/nicetime'

import kebabCase from 'lodash/kebabCase'
import 'prismjs/themes/prism-okaidia.css'

import SEO from '../components/seo'
import PostLoop from '../components/listing'

export default ({ data }) => {
  const skip = false
  const post = data.blog
  let related
  data.relatedPosts ? (related = data.relatedPosts.edges) : (related = null)
  const currentDate = new Date()

  const tags = post.frontmatter.tags.map(tag => (
    <li key={tag}>
      <Link to={'/tags/' + kebabCase(tag)}>#{tag}</Link>
    </li>
  ))

  const postImage =
    post.frontmatter.cover_image.childImageSharp &&
    post.frontmatter.cover_image.childImageSharp.sizes &&
    post.frontmatter.cover_image.childImageSharp.sizes.src

  return (
    <div className="blog">
      <SEO
        key={`seo-${post.fields.slug}`}
        postImage={postImage}
        postData={post}
        isBlogPost
      />
      <article className="article">
        <figure className="cover">
          <Img sizes={post.frontmatter.cover_image.childImageSharp.sizes} />
        </figure>

        <section className="container">
          <section className="content">
            <h1 className="title">{post.frontmatter.title}</h1>

            <div dangerouslySetInnerHTML={{ __html: post.html }} />

            <aside className="TagCloud small">
              <ul>{tags}</ul>
            </aside>
          </section>
        </section>
      </article>
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!, $tag: String!) {
    blog: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        cover_image {
          childImageSharp {
            sizes(maxWidth: 1240) {
              tracedSVG
              src
              srcSet
            }
          }
        }
        date(formatString: "DD MMMM, YYYY")
        tags
      }
      fields {
        slug
      }
    }
    relatedPosts: allMarkdownRemark(
      limit: 2
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { slug: { ne: $slug } }
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            cover_image {
              childImageSharp {
                sizes(maxWidth: 1240) {
                  src
                  srcSet
                }
              }
            }
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
