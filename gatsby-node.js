const path = require(`path`)
const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })
  //以下を動かすとエラーが出る
  // const postsPerPage = 4
  // const numberOfPages = Math.ceil(posts.length / postsPerPage)

  // Array.from({ length: numberOfPages }).forEach((_, index) => {
  //   const isFirstPage = index === 0
  //   const currentPage = index + 1
  //   // Skip first page because of index.js
  //   if (isFirstPage) return

  //   createPage({
  //     path: `/page/${currentPage}`,
  //     component: blogPostTemplate,
  //     context: {
  //       limit: postsPerPage,
  //       skip: index * postsPerPage,
  //       numberOfPages: numberOfPages,
  //       currentPage: currentPage,
  //     },
  //   })
  // })
}
