module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("shareimages");
  eleventyConfig.addPassthroughCopy("data");
  eleventyConfig.addPassthroughCopy("server");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("local_frame");

  eleventyConfig.addGlobalData("layoutMap", {});
  eleventyConfig.addExtension("html", {
    compile: function (inputContent, inputPath) {
      const layout = this.frontMatter?.data?.layout;
      if (layout) {
        eleventyConfig.globalData.layoutMap[inputPath] = layout;
      }
      return undefined;
    }
  });
  eleventyConfig.addTransform("beta", function(content){
    const layout = eleventyConfig.globalData.layoutMap[this.page.inputPath];
    if (!layout) {
      console.log(`${this.page.inputPath} is ${layout}`)
      console.log(eleventyConfig.globalData.layoutMap)
      return content;
    }
    console.log(layout)
    if(layout == "beta.njk"){
      return "This works";
    }
  });
};
