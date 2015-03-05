var markdownpdf = require("markdown-pdf"),
    fs = require("fs"),
    input_dir = './',
    output_dir = './pdf/',
    data={}

fs.readdir(input_dir, function(err, files) {
    files.filter(function(file) {
      // console.log(/(.*)\.md$/im.test(file)); // test regex
      return /(.*)\.md$/igm.test(file)
    }).forEach(function(file) {
      if(file !== "README.md"){
        var re = /(.*)\..+$/im,
            filename = file.match(re)[1] + ".pdf"

        console.log("Converting " + file + " to " + filename)
        fs.createReadStream(file)
          .pipe(markdownpdf())
          .pipe(fs.createWriteStream(output_dir + filename))
      }
    })
})
