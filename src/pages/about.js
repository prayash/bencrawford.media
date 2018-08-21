import React from 'react'
import styled from 'react-emotion'

import { t } from '../../config'
import Layout from '../components/layout'
import image from '../assets/img/very-professional-yet-casual.jpg'
import { Container } from '../components/general'

const ColumnContainer = styled(Container)`
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const Photo = styled.img`
  width: 100%;
  max-width: 500px;
`

const Section = styled.section`
  position: relative;
  margin-bottom: 50px;
  max-width: 800px;
`

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${props => (props.leanRight ? 'flex-end' : 'initial')};
  width: auto;
`

const Column = styled.div`
  width: 60%;

  p {
    padding: 0 200px 0 50px;
    position: relative;
  }
`

const AboutHeading = styled.h2`
  bottom: 20%;
  font-family: CustomFont, sans-serif;
  font-size: 93px;
  font-weight: 100;
  line-height: 93px;
  letter-spacing: 0.3em;
  z-index: 10;
  position: absolute;
  text-transform: uppercase;
  transition: all 1.3s ease-in-out;
`

const AboutSection = styled.section`
  align-items: center;
  flex-direction: column;
  width: 80%;
`

const LeftPane = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 45%;
`

const RightPane = styled.div`
  position: relative;
  margin: 0 0 15px;
  padding: 0 7.5px;
  float: left;
  display: inline-block;
  width: 55%;
`

const SlashList = styled.ul`
  color: #8d8e8e;
  margin: 0;
  opacity: 1;
  padding: 0;
  transition: all 1s ease-in-out;

  li {
    display: inline-block;
    padding: 0;
    text-transform: uppercase;

    span {
      font-family: CustomFont;
      font-size: 18px;
      font-weight: lighter;
    }

    &:after {
      content: '/';
      padding: 0 10px;
    }
  }

  li:last-child {
    &:after {
      content: '';
    }
  }
`

export default props => {
  return (
    <Layout location={props.location}>
      <ColumnContainer>
        <Section>
          <Row>
            <LeftPane>
              <SlashList>
                <li>
                  <span>Filmmaker</span>
                </li>
                <li>
                  <span>Photographer</span>
                </li>
                <li>
                  <span>Adventurer</span>
                </li>
              </SlashList>
              <AboutHeading>Ben Crawford</AboutHeading>
            </LeftPane>

            <RightPane>
              <Photo src={image} />
            </RightPane>
          </Row>
        </Section>

        <Section>
          <Row>
            <LeftPane />

            <RightPane>
              <p>{t('about.intro')}</p>
              <p>{t('about.body')}</p>
            </RightPane>
          </Row>
        </Section>
      </ColumnContainer>
    </Layout>
  )
}
