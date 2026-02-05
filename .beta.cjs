const cheerio = require("cheerio");
const path = require('path');
const fs = require("fs");

module.exports = function(content, inputPath){
    const throwError = e => {
        return `An error occured while building: ${e}`;
    }
    if (typeof inputPath !== 'string'){
        return throwError("Path must be a string. ");
    }
    const pageName = path.normalize(inputPath).replace(/^(\.\/|\/)+/, '');
    const raw = fs.readFileSync("./.beta.pages.json", "utf8");
    const config = JSON.parse(raw);
    const $ = cheerio.load(content);
    for(const i of config){
        if(i?.page == pageName){
            if(typeof i?.template != "string" && i?.template == undefined)return throwError("The template parameter must be string. ");
            switch (i?.template) {
                case undefined:
                    break;
                case "none":
                    break;
                case "bn":
                    const templatehtml = fs.readFileSync("./beta_assets/base.htm", "utf8");
                    const body = $("body").html();
                    const templated = templatehtml.replace("{{Content}}", body);
                    $("body").html(templated);
                    $("head").append('<link rel="stylesheet" href="/styles/style.css">')
                    break;
                default:
                    return throwError(`"${i?.template}" was not a template. `);
            }
        }
    }
    return $.html();
}