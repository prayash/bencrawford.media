const path = require('path')
const _ = require('lodash')
const createPaginatedPages = require('gatsby-paginate')

exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
  setBabelPlugin({ name: 'babel-plugin-tailwind' })
  setBabelPlugin({ name: 'babel-plugin-emotion' })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  let slug
  if (node.internal.type === 'MarkdownRemark') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    }
    createNodeField({ node, name: 'slug', value: slug })
  }
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
                  fluid(maxWidth: 1080) {
                    sizes
                    src
                    srcSet
                    aspectRatio
                  }
                }
              }
              videoId
              tags
              subtitle
              order
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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.js')
    const categoryPage = path.resolve('src/templates/category.js')

    createMotionPagination(graphql, createPage, resolve, reject)

    resolve(
      graphql(`
        {
          posts: allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  category
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.posts.edges

        posts.forEach((edge, index) => {
          const next = index === 0 ? null : posts[index - 1].node
          const prev = index === posts.length - 1 ? null : posts[index + 1].node

          createPage({
            path: edge.node.fields.slug,
            component: postPage,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next
            }
          })
        })

        let categories = []

        _.each(posts, edge => {
          if (_.get(edge, 'node.frontmatter.category')) {
            categories = categories.concat(edge.node.frontmatter.category)
          }
        })

        categories = _.uniq(categories)

        categories.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}`,
            component: categoryPage,
            context: {
              category
            }
          })
        })
      })
    )
  })
}
