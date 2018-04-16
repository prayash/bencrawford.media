/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const createPaginatedPages = require('gatsby-paginate')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

/**
 *  Pagination for /blog
 */
function createBlogPagination(graphql, createPage, resolve, reject) {
  graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { section: { eq: "blog" } } }) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
              cover_image {
                publicURL
                childImageSharp {
                  sizes(maxWidth: 1240) {
                    srcSet
                  }
                }
              }
              section
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    createPaginatedPages({
      edges: result.data.allMarkdownRemark.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/blog-archive.js',
      pageLength: 6,
      pathPrefix: 'blog',
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    })
  })
}

/**
 *  Pagination for /stills
 */
function createStillsPagination(graphql, createPage, resolve, reject) {
  graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { section: { eq: "stills" } } }
      ) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
              cover_image {
                publicURL
                childImageSharp {
                  sizes(maxWidth: 1240) {
                    srcSet
                  }
                }
              }
              section
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    createPaginatedPages({
      edges: result.data.allMarkdownRemark.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/stills.js',
      pageLength: 6,
      pathPrefix: 'stills',
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    })
  })
}

/**
 *  Pagination for /motion
 */
function createMotionPagination(graphql, createPage, resolve, reject) {
  graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { section: { eq: "motion" } } }
      ) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
              cover_image {
                publicURL
                childImageSharp {
                  sizes(maxWidth: 1240) {
                    srcSet
                  }
                }
              }
              section
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    createPaginatedPages({
      edges: result.data.allMarkdownRemark.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/motion.js',
      pageLength: 6,
      pathPrefix: 'motion',
      buildPath: (index, pathPrefix) =>
        index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}` // This is optional and this is the default
    })
  })
}

/**
 *  Create slug pages for markdown files
 *  Create pages for each tag
 */
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              excerpt
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
          }
        }
      }
    `).then(result => {
      /**
       * Create blog posts based on slugs
       */
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        // Grab random tag to do related posts
        var tag =
          node.frontmatter.tags[
            Math.floor(Math.random() * node.frontmatter.tags.length)
          ]

        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            tag: tag,
            slug: node.fields.slug
          }
        })
      })

      resolve()
    })

    createBlogPagination(graphql, createPage, resolve, reject)
    createStillsPagination(graphql, createPage, resolve, reject)
    createMotionPagination(graphql, createPage, resolve, reject)
  })
}
