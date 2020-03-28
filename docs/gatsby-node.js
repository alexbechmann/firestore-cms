const path = require("path");
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const docTemplate = path.resolve(`src/templates/docs-template.tsx`);
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___title] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt
            id
            fileAbsolutePath
            html
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    result.data.allMarkdownRemark.edges
      .filter(({ node }) => node.frontmatter.path)
      .forEach(({ node }) => {
        // const filePathSections = node.fileAbsolutePath.split("/");
        // const section = filePathSections[filePathSections.length - 2].split(
        //   "_"
        // )[1];
        // console.log({ section });

        createPage({
          path: node.frontmatter.path,
          component: docTemplate,
          context: {
            // section
          }
        });
      });
  });
};
