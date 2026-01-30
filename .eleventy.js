module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("shareimages");
  eleventyConfig.addPassthroughCopy("data");
  eleventyConfig.addPassthroughCopy("server");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("local_frame");

  eleventyConfig.addTransform("beta", content=>{
    if(content.frontmatter.layout == "beta.njk"){
      return "This works";
    }
  });
};