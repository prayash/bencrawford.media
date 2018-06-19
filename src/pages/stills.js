import React from 'react'
import { withPrefix } from 'gatsby-link'
import Gallery from 'react-photo-gallery'
import Measure from 'react-measure'
import load from 'load-asset'

const FILTERS = ['all', 'adventure', 'landscape', 'lifestyle']

class Stills extends React.Component {
  state = {
    photos: [],
    width: -1
  }

  componentDidMount() {
    this.loadPhotos()
  }

  async loadPhotos() {
    const urls = [
      require('../assets/img/landscape/big-sandy.jpg'),
      require('../assets/img/landscape/canyon.jpg'),
      require('../assets/img/landscape/cascade.jpg'),
      require('../assets/img/landscape/eclipse.jpg'),
      require('../assets/img/landscape/flagpole.jpg'),
      require('../assets/img/landscape/flower.jpg'),
      require('../assets/img/landscape/garden.jpg'),
      require('../assets/img/landscape/olympos-beach.jpg'),
      require('../assets/img/landscape/rocks.jpg'),
      require('../assets/img/landscape/sunset.png')
    ]

    const items = await load.all(urls)

    this.setState({
      photos: items.map(item => {
        return {
          src: item.src,
          width: item.width,
          height: item.height
        }
      })
    })
  }

  activateFilter = filter => {
    console.log(filter)
  }

  render() {
    let { width, photos, loadedAll } = this.state
    let isLoading = photos.length === 0

    if (isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div className="stills container">
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

        <Measure
          bounds
          onResize={contentRect =>
            this.setState({
              width: contentRect.bounds.width
            })
          }
        >
          {({ measureRef }) => {
            let columns = 1
            if (width >= 480) {
              columns = 2
            }
            if (width >= 1024) {
              columns = 3
            }
            if (width >= 1824) {
              columns = 3
            }

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
}

export default Stills
