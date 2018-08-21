import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'react-emotion'
import Gallery from 'react-photo-gallery'
import Measure from 'react-measure'

import Layout from '../components/layout'
import { Container, FilterList, FilterItem } from '../components/general'

let Filters = styled.section`
  padding: 0 48px 0 0;
`

let ListItem = styled.li`
  margin: 0;
  padding: 0;
`

const FILTERS = ['all', 'adventure', 'landscape', 'lifestyle', 'people']

export default class Stills extends React.Component {
  state = {
    photos: [],
    width: 1,
    filter: 'all'
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
            height: 600 / sizes.aspectRatio,
            category: extractCategory(src)
          }
        }
      })
    })
  }

  activateFilter = filter => {
    this.setState({ filter })
  }

  renderFilters = () => {
    return (
      <Filters>
        <FilterList>
          <p>filter:</p>

          {FILTERS.map(filter => (
            <ListItem key={filter}>
              <FilterItem onClick={this.activateFilter.bind(this, filter)}>
                {filter}
              </FilterItem>
            </ListItem>
          ))}
        </FilterList>
      </Filters>
    )
  }

  render() {
    let { width, photos, loadedAll, filter } = this.state
    let filtered = photos.filter(photo => photo.category === filter)

    if (filter === 'all') {
      filtered = photos
    }

    return (
      <Layout className="stills" location={this.props.location}>
        <Container>
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
              let columns = this.calculateColumns(width)

              return (
                <div ref={measureRef} className="gallery-container">
                  <Gallery
                    className="gallery"
                    columns={columns}
                    photos={filtered}
                  />
                </div>
              )
            }}
          </Measure>
        </Container>
      </Layout>
    )
  }

  calculateColumns(width) {
    if (width >= 480) {
      return 2
    }

    if (width >= 1024) {
      return 3
    }

    return 1
  }
}

function extractCategory(path) {
  return path.split('/')[2].split('-')[0]
}

export const pageQuery = graphql`
  query ImagesQuery {
    allFile(filter: { sourceInstanceName: { eq: "stills" } }) {
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
