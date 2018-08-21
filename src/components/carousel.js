import React from 'react'
import styled from 'react-emotion'
import makeCarousel from 'react-reveal/makeCarousel'
import Slide from 'react-reveal/Slide'

import slide1 from '../assets/img/slides/eclipse.jpg'
import slide2 from '../assets/img/slides/rocks.jpg'

let Container = styled.div`
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: -2;
`

let Wrapper = styled.div`
  transition: opacity 0.5s ease-in-out;
`

let SlideInner = styled.div`
  background-image: ${props => props.image};
  background-position: 50%;
  background-size: cover;
  display: block;
  float: left;
  height: 100%;
  margin-right: -100%;
  position: relative;
  width: 100%;
  z-index: -1;
`

let CarouselUI = ({ children }) => <Container>{children}</Container>
let Carousel = makeCarousel(CarouselUI)

export default props => {
  return (
    <Wrapper className={props.visible ? 'visible' : 'hide'}>
      <Carousel defaultWait={props.interval} maxTurns={999}>
        <Slide right>
          <SlideInner image={`url(${slide1})`} />
        </Slide>

        <Slide right>
          <SlideInner image={`url(${slide2})`} />
        </Slide>
      </Carousel>
    </Wrapper>
  )
}
