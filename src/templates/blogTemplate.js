import React from "react"
import Helmet from 'react-helmet';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default function Template({
  data,pageContext // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data // data.markdownRemark holds your post data
  const { siteMetadata } = site
  const { frontmatter, html } = markdownRemark
  const { previous, next } = pageContext //追加
  console.log(pageContext)
  

  return (
    <Layout>
      <Helmet>

        <title>{frontmatter.title} | {siteMetadata.title}</title>
        <meta name="description" content={frontmatter.metaDescription} />
        <script data-ad-client="ca-pub-1517851734140691" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

      </Helmet>
      <div className="blog-post-container">
        <article className="post">
          
          {!frontmatter.thumbnail && (

            <div className="post-thumbnail">

              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">{frontmatter.date}</div>
            </div>
          )}
          {!!frontmatter.thumbnail && (
          
            <div className="post-thumbnail" style={{backgroundImage: `url(${frontmatter.thumbnail})`}}>
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">{frontmatter.date}</div>
            </div>
          )}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="pagenation-item">
            <div className="prev-item">
            {previous && (
            <Link to={previous.frontmatter.path} rel="prev"  >
              
              <span>&laquo; Prev</span>

              {previous.frontmatter.title}

            </Link>
           )}
           </div>
           <div className="prev-item">

          {next && (
            <Link to={next.frontmatter.path} rel="next ">
              <span>Next &raquo;</span>
              {next.frontmatter.title}

            </Link>
          )}
          </div>
          </div>
        </article>

      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 100, sort: {fields: id, order: ASC}, skip: 0) {
      edges {
        node {
          id
          headings {
            value
            depth
          }
          frontmatter {
            date
            path
            title
          }
        }
        next {
          id
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        perPage
        pageCount
        itemCount
        hasPreviousPage
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        thumbnail
        metaDescription
      }
    }
  }
`