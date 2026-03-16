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
            if(typeof i?.title != "string" && i?.title != undefined)return throwError("The title parameter must be string. ");
            if(i?.title)$("head").append(`<title>${i?.title}</title>`)
            if(typeof i?.logo != "string" && i?.logo != undefined)return throwError("The logo parameter must be string. ");
            if(i?.logo)$("head").append(`<link rel="icon" href="${i?.logo}">`)
            if(typeof i?.template != "string" && i?.template != undefined)return throwError("The template parameter must be string. ");
            switch (i?.template) {
                case undefined:
                    break;
                case "none":
                    break;
                case "bn":
                    (()=>{
                        const templatehtml = fs.readFileSync("./beta_assets/base.htm", "utf8");
                        const body = $("body").html();
                        const templated = templatehtml.replace("{{Content}}", body);
                        $("body").html(templated);
                    })()
                    break;
                case "bn-div":
                    (()=>{
                        const templatehtml = fs.readFileSync("./beta_assets/base.htm", "utf8");
                        const body = $("body").html();
                        const templated = templatehtml.replace("{{Content}}", body);
                        $("body").html(templated);
                        $("head").append('<link rel="stylesheet" href="/styles/style.css">\n<link rel="stylesheet" href="/styles/divstyles.css">')
                    })()
                default:
                    return throwError(`"${i?.template}" was not a template. `);
            }
            if(i?.plugins){
                if(typeof i?.plugins != "object")return throwError("Plugins must be array. ");
                for(let j in i?.plugins){
                    if(j?.name == undefined)return throwError("Must specify the name of the plugin. ");
                    if(typeof j?.name != "string")return throwError("Plugin name must be string. ");
                    if(typeof j?.args != "object" && i?.plugins?.args != undefined)return throwError(`Arguments of plugin: ${i?.plugins?.name} must be objects. `);
                }
            }
            if(i?.head){
                if(typeof i?.head != "object")return throwError("Head tags are not objects. ");
                $("head").append(i?.head.join("\n"))
            }
            if(i?.lang){
                if(typeof i?.lang != "object")return throwError("Lang parameter must be object. ");
                for(let j in i?.lang){
                    if(j == "babel"){
                        $("head").append(`<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script>
Babel.registerPreset("beta-defualt", ${i?.lang?.[j]});
</script>`);
                        $('script[type="text/babel"]').each((i, el) => {
                            const $el = $(el);
                            const presets = $el.attr('data-presets');

                            if (!presets || presets.trim() === '') {
                                $el.attr('data-presets', 'beta-defualt');
                            }
                        });
                    }
                    if(j == "jquery"){
                        $("head").append('<script src="https://code.jquery.com/jquery-4.0.0.min.js" integrity="sha256-OaVG6prZf4v69dPg6PhVattBXkcOWQB62pdZ3ORyrao=" crossorigin="anonymous"></script>');
                    }
                    if(j == "typescript"){
                        $("head").append('<script src="/scripts/external/tsc/typescript.js"></script>');
                        $("body").append('<script src="/scripts/external/tsc/transpiler.js"></script>');
                    }
                }
            }
        }
    }
    return $.html();
}