const fs = require("fs");
const matter = require("gray-matter");
const beta = require("./.beta.cjs");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("shareimages");
  eleventyConfig.addPassthroughCopy("data");
  eleventyConfig.addPassthroughCopy("server");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("local_frame");

  eleventyConfig.addTransform("beta", function(content){
    const raw = fs.readFileSync(this.page.inputPath, "utf8");
    const parsed = matter(raw);
    const frontMatter = parsed?.data;
    const layout = frontMatter?.layout;
    if (!layout) {
      return beta.beta(content, this.page.inputPath);
    }
    if(layout == "beta.njk"){
      return "This works";
    } else {
      return content;
    }
  });
};