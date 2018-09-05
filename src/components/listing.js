import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'react-emotion'
import { Parallax, ParallaxLayer } from 'react-spring'
import YouTube from 'react-youtube'
import { PlayIcon } from './icons'

const Content = styled(ParallaxLayer)`
  ${tw('p-6 md:p-12 lg:p-24 justify-center items-center flex z-50 w-full')};
`

let Card = styled.article`
  animation: 1s ease-out 0s 1 slideUpFade;
  display: flex;
  margin: 30px;
  max-width: 1080px;
  min-width: 320px;
  position: relative;
  transition: transform 0.4s, box-shadow 0.5s, -webkit-transform 0.4s;
  width: 100%;
`

const Hero = styled.div`
  ${tw('w-full')};
`

// A workaround to get the YouTube iframe to take up its parent container's dimensions.
// https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php
const ImgWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const CardContent = styled.div`
  ${tw('absolute bg-white p-8')};
  bottom: 5rem;
  max-width: 35%;
  opacity: ${props => (props.hide ? 0 : 1)};
  transition: opacity 0.6s ease-in-out;
  right: -5rem;
  @media (max-width: 760px) {
    background: transparent;
    max-width: 100%;
    padding-left: 0;
    position: initial;
  }
`

const ProjectTitle = styled.h1`
  ${tw('antialiased uppercase p-0 m-0')};
  font-family: CustomFont, Roboto, Helvetica, sans-serif;
  font-size: 4rem;
`

const ProjectTags = styled.p`
  ${tw('antialiased uppercase')};
  font-family: CustomFont, Roboto, Helvetica, sans-serif;
  letter-spacing: 0.16rem;
`

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: ${props => (props.hide ? 0 : 1)};
  outline: none;
  pointer-events: ${props => (props.hide ? 'none' : 'initial')};
  transition: opacity 0.6s ease-in-out;
  z-index: 10;
`

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 12px;
  width: 100%;
`

const byOrder = (prev, next) =>
  prev.node.frontmatter.order - next.node.frontmatter.order

export default class Listing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      previewing: null,
      data: props.data.sort(byOrder)
    }
  }

  handlePlay(index) {
    this.setState({
      previewing: index
    })
  }

  render() {
    let { data, previewing } = this.state

    return (
      <Parallax pages={data.length}>
        {data.map(({ node }, index) => (
          <Content speed={0.5} offset={index} key={index}>
            <Card>
              <Hero>
                <ImgWrapper>
                  <Img
                    fadeIn
                    fluid={node.frontmatter.cover_image.childImageSharp.fluid}
                    aspectRatio={
                      node.frontmatter.cover_image.childImageSharp.fluid
                        .aspectRatio
                    }
                  />

                  <ButtonContainer>
                    <Button
                      onClick={this.handlePlay.bind(this, index)}
                      hide={previewing === index}
                    >
                      <PlayIcon />
                    </Button>
                  </ButtonContainer>

                  <VideoEmbed
                    visible={previewing === index}
                    videoId={node.frontmatter.videoId}
                  />
                </ImgWrapper>

                <CardContent hide={previewing === index}>
                  <ProjectTags>{node.frontmatter.subtitle}</ProjectTags>
                  <ProjectTitle>{node.frontmatter.title}</ProjectTitle>
                </CardContent>
              </Hero>
            </Card>
          </Content>
        ))}
      </Parallax>
    )
  }
}

function VideoEmbed({ visible, videoId }) {
  if (!visible) {
    return null
  }

  return (
    <YouTube
      videoId={videoId}
      opts={{
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          rel: 0
        }
      }}
    />
  )
}
