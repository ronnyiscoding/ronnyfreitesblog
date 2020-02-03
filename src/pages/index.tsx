import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import Header from '../components/header'

const Container = tw.div`flex justify-center`

const StyledLink = styled(Link)`
  ${tw`font-sans text-lg text-gray-800 text-center no-underline mb-3`}
`

const PageContainer = tw.div`min-h-screen bg-gray-100`

interface LayoutProps {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: {
              date: String,
              path: String,
              title: String
            }
          }
        }
      ]
    }
  }
}

const Layout = ({data}: LayoutProps) => {
  const { edges } = data.allMarkdownRemark
  return (
    <PageContainer>
      <Header />
      {edges.map(edge => {
        const { frontmatter } = edge.node
        return (
          <Container key={frontmatter.date}>
            <StyledLink to={frontmatter.path}>
              {frontmatter.title}
            </StyledLink>
          </Container>
        )
      })}
    </PageContainer>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`

export default Layout
