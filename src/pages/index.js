import React from 'react'
import Link from 'gatsby-link'
import cx from 'classnames'
import Slider from 'react-slick'
import Img from 'gatsby-image'

import Header from '../components/header'
import config from '../config'
import '../scss/index.scss'

import reel from '../assets/img/reel.mp4'
import slide1 from '../assets/img/slides/eclipse.jpg'
import slide2 from '../assets/img/slides/rocks.jpg'

const DEFAULT_LEFT = {
  motion: 0,
  about: 33.33,
  stills: 66.66
}

const EXPANDED_LEFT = {
  motion: 0,
  about: 25,
  stills: 50
}

export default class Index extends React.Component {
  state = {
    panels: [
      {
        title: 'motion',
        left: 0,
        leftExpanded: 0,
        alpha: 0
      },
      {
        title: 'about',
        left: 33.33,
        leftExpanded: 25,
        alpha: 0
      },
      {
        title: 'stills',
        left: 66.66,
        leftExpanded: 50,
        alpha: 0
      }
    ],
    expanded: null
  }

  render() {
    let { expanded, panels } = this.state
    let settings = {
      arrows: false,
      autoplay: true,
      dots: false,
      fade: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    let { background } = this.props.data

    return (
      <div className="home container">
        <Img
          style={{ position: 'absolute', height: '100%', width: '100%' }}
          sizes={background.sizes}
          resolutions={background.resolutions}
        />

        <div className="panels">
          {panels.map((p, index) => {
            let isExpanded = index === expanded
            let classes = cx(p.title, {
              expanded: isExpanded,
              darken: !isExpanded && expanded !== null && p.title !== 'about',
              grayen:
                expanded !== null && expanded !== index && p.title === 'about'
            })

            return (
              <section
                key={index}
                className={classes}
                style={{
                  left: isExpanded
                    ? EXPANDED_LEFT[p.title] + '%'
                    : DEFAULT_LEFT[p.title] + '%',
                  width: isExpanded ? '50%' : '33.33%'
                }}
              >
                <Link
                  to={p.title}
                  onClick={this._handleOnClick.bind(this)}
                  onMouseEnter={this._handleMouseEnter.bind(this, index)}
                  onMouseLeave={this._handleMouseLeave.bind(this, index)}
                >
                  {p.title}
                </Link>

                {p.title === 'stills' && (
                  <Slider {...settings}>
                    <div className="slide">
                      <div
                        className="slide-inner"
                        style={{
                          backgroundImage: `url(${slide1})`
                        }}
                      />
                    </div>

                    <div className="slide">
                      <div
                        className="slide-inner"
                        style={{
                          backgroundImage: `url(${slide2})`
                        }}
                      />
                    </div>
                  </Slider>
                )}

                {p.title === 'motion' && (
                  <video loop muted autoPlay className="motion-reel">
                    <source src={reel} type="video/mp4" />
                  </video>
                )}
              </section>
            )
          })}
        </div>
      </div>
    )
  }

  _handleOnClick = e => {
    DEFAULT_LEFT['about'] = 33.33
    this.setState({ expanded: null })
  }

  _handleMouseEnter = (index, e) => {
    if (index === 0) {
      DEFAULT_LEFT['about'] = 50
    } else if (index === 2) {
      DEFAULT_LEFT['about'] = 16.66
    }

    this.setState({
      expanded: index
    })
  }

  _handleMouseLeave = (index, e) => {
    if (index === 0) {
      DEFAULT_LEFT['about'] = 33.33
    } else if (index === 2) {
      DEFAULT_LEFT['about'] = 33.33
    }

    this.setState({ expanded: null })
  }
}

export const query = graphql`
  query IndexQuery {
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
      filter: { frontmatter: { section: { eq: "blog" } } }
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
          excerpt
        }
      }
    }
    background: imageSharp(id: { regex: "/bg2.jpg/" }) {
      sizes(maxWidth: 1280, quality: 100) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
