import React from 'react'
import { Link } from 'gatsby'
import styled from 'react-emotion'

import Layout from '../components/layout'
import Listing from '../components/listing'

const Motion = ({ data, pageContext }) => {
  const { group } = pageContext

  return (
    <Layout className="motion" location="/motion">
      <Listing data={group} />
    </Layout>
  )
}

export default Motion
