import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'react-emotion'
import kebabCase from 'lodash/kebabCase'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Wrapper from '../components/wrapper'
import Header from '../components/header'
import Subline from '../components/subline'
import { media } from '../utils/media'

import config from '../../config'

const Content = styled.article`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.bg};
  z-index: 9000;
  margin-top: -3rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
`

const Title = styled.h1`
  margin-bottom: 1rem;
`

const PostContent = styled.div`
  margin-top: 4rem;
`

const Post = props => {
  const { slug } = props.pageContext
  const postNode = props.data.markdownRemark
  const post = postNode.frontmatter

  return (
    <Layout>
      <Wrapper>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <Helmet title={`${post.title} | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
        </Header>
        <Content>
          <Title>{post.title}</Title>
          <Subline>
            {post.date} &mdash; {postNode.timeToRead} Min Read &mdash; In{' '}
            <Link to={`/categories/${kebabCase(post.category)}`}>
              {post.category}
            </Link>
          </Subline>
          <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default Post

/* eslint no-undef: off */
export const postQuery = graphql`
  query postBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        category
      }
      timeToRead
    }
  }
`
