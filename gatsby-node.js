// const path = require('path');
// const { createFilePath } = require(`gatsby-source-filesystem`);

// const BLOG_POST_FILENAME_REGEX = /([0-9]+)\-([0-9]+)\-([0-9]+)\-(.+)$/;

// exports.onCreateNode = ({ node, getNode, actions }) => {
//     const { createNodeField } = actions;

//     if (node.internal.type === `Mdx`) {
//         if (node.internal.type === `Mdx`) {
//             const slug = createFilePath({ node, getNode })

//             //isolate date and post title from folder name
//             const match = BLOG_POST_FILENAME_REGEX.exec(slug)

//             if (match !== null) {
//                 const year = match[1]
//                 const month = match[2]
//                 const day = match[3]
//                 const filename = match[4]
//                 const date = new Date(year, month - 1, day)

//                 createNodeField({
//                     name: `slug`,
//                     node,
//                     value: `/writing/${filename}`,
//                 })

//                 createNodeField({
//                     name: `date`,
//                     node,
//                     value: date.toJSON(),
//                 })
//             } else {
//                 createNodeField({
//                     name: `slug`,
//                     node,
//                     value: slug,
//                 })
//             }
//         }
//     }
// }

// exports.createPages = async ({ graphql, actions }) => {
//     const { createPage } = actions
//     const blogPost = path.resolve(`src/templates/PostMarkdown/PostMarkdown.jsx`);

//     const result = await graphql(`
//     query {
//         allMdx(
//                 sort: { fields: [frontmatter___date], order: DESC }
//                     limit: 1000
//                 ){
//                 edges {
//                     node {
//                         fields {
//                             slug
//                         }
//                     }
//                 }
//             }
//         }
//   `)

//     if (result.errors) {
//         throw result.errors
//     }

//     // Create blog posts pages.
//     const posts = result.data.allMdx.edges

//     posts.forEach((post, index) => {
//         const previous = index === posts.length - 1 ? null : posts[index + 1].node
//         const next = index === 0 ? null : posts[index - 1].node

//         createPage({
//             path: post.node.fields.slug,
//             component: blogPost,
//             context: {
//                 slug: post.node.fields.slug,
//                 previous,
//                 next,
//             },
//         })
//     })
// }

exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
}) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.csv$/,
                    loader: 'csv-loader',
                    options: {
                        dynamicTyping: true,
                        header: true,
                        skipEmptyLines: true
                    }
                },
            ],
        },
        plugins: [
            plugins.define({
                __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
            }),
        ],
    })
}