const path = require('path');
const fs = require("fs");

module.exports({
    beta: (content, inputPath)=>{
        const throwError = e => {
            return `An error occured while building: ${e}`;
        }
        if (typeof inputPath !== 'string'){
            return throwError("Path must be a string. ");
        }
        const pageName = path.normalize(inputPath).replace(/^(\.\/|\/)+/, '');
        const raw = fs.readFileSync("./.beta.pages.json", "utf8");
        return content;
    }
})