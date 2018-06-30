import React from 'react'

import Gallery from 'react-photo-gallery'
import Measure from 'react-measure'
import Image from 'gatsby-image'

const FILTERS = ['all', 'adventure', 'landscape', 'lifestyle']

export default class Stills extends React.Component {
  state = {
    photos: [],
    width: 1
  }

  componentDidMount() {
    if (window) {
      this.loadPhotos()
    }
  }

  loadPhotos() {
    let { edges } = this.props.data.allFile

    // @HACK: Not sure why some nodes are coming in null
    let allImages = edges.filter(e => e.node.childImageSharp !== null)

    this.setState({
      photos: allImages.map(edge => {
        let { node } = edge

        if (node.childImageSharp) {
          let { sizes } = node.childImageSharp
          let { src } = sizes

          return {
            src,
            sizes: [`${sizes.sizes}`],
            width: 600,
            height: 600 / sizes.aspectRatio
          }
        }
      })
    })
  }

  activateFilter = filter => {
    console.log(filter)
  }

  renderFilters = () => {
    return (
      <section className="stills__filter">
        <ul className="filter__list">
          <p>filter:</p>

          {FILTERS.map((filter, i) => (
            <li key={i}>
              <button
                className="filter__link"
                onClick={this.activateFilter.bind(this, filter)}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  render() {
    let { width, photos, loadedAll } = this.state

    return (
      <div className="stills container">
        {this.renderFilters()}

        <Measure
          bounds
          onResize={contentRect =>
            this.setState({
              width: contentRect.bounds.width
            })
          }
        >
          {({ measureRef }) => {
            let columns = this.calculateColumns(width) || 1

            return (
              <div ref={measureRef} className="gallery-container">
                <Gallery
                  className="gallery"
                  columns={columns}
                  photos={photos}
                />
              </div>
            )
          }}
        </Measure>
      </div>
    )
  }

  calculateColumns(width) {
    if (width >= 480) {
      return 2
    }

    if (width >= 1024) {
      return 3
    }

    return 0
  }
}

export const pageQuery = graphql`
  query ImagesQuery {
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      edges {
        node {
          childImageSharp {
            sizes(maxWidth: 600, quality: 95) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
