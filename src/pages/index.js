import React from 'react'
import styled from 'react-emotion'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import Carousel from '../components/carousel'

const Section = styled.section`
  align-items: center;
  background-color: ${props => props.bgColor};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  left: ${props => props.left};
  padding-bottom: 140px;
  position: absolute;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  width: ${props => props.width};
  z-index: ${props => (props.top ? 2 : 1)};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 760px) {
    border-bottom: 1px solid #fff;
    height: 33.33vh;
    justify-content: center;
    left: 0;
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;

    video {
      width: 100%;
    }
  }
`

const PanelLink = styled(Link)`
  border: none;
  color: ${props => props.color};
  cursor: pointer;
  display: block;
  font-family: CustomFont, Roboto, Helvetica, sans-serif;
  font-size: 3em;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-align: center;
  margin-bottom: 0;
  text-decoration: none !important;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  user-select: none;
  width: 100%;
  z-index: 2;

  &:hover {
    color: ${props => props.color};
  }
`

const Video = styled.video`
  height: 100%;
  left: 0;
  opacity: ${props => (props.show ? 1 : 0)};
  position: absolute;
  top: 0;
  transform: translateX(-35%);
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
`

const CarouselWrapper = styled.div`
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`

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
    let { background } = this.props.data
    let { publicURL: reel } = this.props.data.allFile.edges[0].node

    return (
      <Layout className="home" location={this.props.location}>
        <Img
          style={{ position: 'absolute', height: '100%', width: '100%' }}
          fluid={background.fluid}
        />

        <div className="panels">
          {panels.map((p, index) => {
            let isExpanded = index === expanded
            let isCarouselVisible = expanded === 2 && index === 2

            let bgColor =
              !isExpanded && expanded !== null && p.title !== 'about'
                ? '#000'
                : 'rgb(44, 44, 44)'

            // This code is heinous, I wish there was a cleaner way to do this...
            if (expanded === null) {
              bgColor = 'transparent'
            } else if (expanded === 2 && index === 2) {
              bgColor = 'transparent'
            } else if (expanded === 1 && index == 1) {
              bgColor = 'white'
            }

            let panelLinkColor = expanded === 0 ? 'black' : 'white'

            if (expanded === 0 && index === 2) {
              panelLinkColor = 'rgb(44, 44, 44)'
            } else if (expanded === 0 && index === 0) {
              panelLinkColor = 'white'
            } else if (expanded === 1 && index !== 1) {
              panelLinkColor = '#2c2c2c'
            } else if (expanded === 1 && index === 1) {
              panelLinkColor = 'black'
            }

            return (
              <Section
                key={index}
                expanded={isExpanded}
                bgColor={bgColor}
                width={isExpanded ? '50%' : '33.33%'}
                top={index === 1}
                left={
                  isExpanded
                    ? EXPANDED_LEFT[p.title] + '%'
                    : DEFAULT_LEFT[p.title] + '%'
                }
              >
                <PanelLink
                  to={p.title}
                  onClick={this._handleOnClick.bind(this)}
                  onMouseEnter={this._handleMouseEnter.bind(this, index)}
                  onMouseLeave={this._handleMouseLeave.bind(this, index)}
                  color={panelLinkColor}
                >
                  {p.title}
                </PanelLink>

                {p.title === 'stills' && (
                  <Carousel interval={3000} visible={isCarouselVisible} />
                )}

                {p.title === 'motion' && (
                  <Video loop muted autoPlay show={expanded === 0}>
                    <source src={reel} type="video/mp4" />
                  </Video>
                )}
              </Section>
            )
          })}
        </div>
      </Layout>
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
    background: imageSharp(fluid: { originalName: { regex: "/_bg.jpg/" } }) {
      fluid(maxWidth: 1280, quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
    allFile(filter: { extension: { eq: "mp4" } }) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`
