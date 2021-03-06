const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const cheerio = require("cheerio");
var pjson = require("./package.json");
var metadata = require("./metadata.json");

class DexTemplatePlugin {
  apply(compiler) {
    compiler.hooks.done.tap("Bindings Plugin", stats => {
      if (!fs.existsSync("metadata.json")) {
        return;
      }
      fs.copyFileSync(
        "metadata.json",
        path.join(compiler.options.output.path, "metadata.json")
      );

      let indexPath = path.join(compiler.options.output.path, "index.html");
      let html = fs.readFileSync(indexPath, "utf8");
      try {
        //let metadata = JSON.parse(fs.readFileSync("metadata.json", "utf8"));

        let bindings = metadata.bindings;

        const $ = cheerio.load(html);
        let bindingContainer = $("<div>");
        bindingContainer.attr("dex-template", "")
        $("head").append(bindingContainer);
        console.log(bindingContainer.text())
        bindings.forEach(binding => {
          if ($(`#${binding.id}`).length === 0)
            bindingContainer.append(
              `<span id=${binding.id} hidden>{{${binding.id}}}</span>`
            );
            console.log(bindingContainer.text())
        });
        
        fs.writeFileSync(indexPath, $.html());
        html = $.html();
        if (fs.existsSync(metadata.icon)) {
          fs.copyFileSync(
            metadata.icon,
            path.join(compiler.options.output.path, metadata.icon)
          );
        }
        metadata.preview.forEach(icon => {
          if (fs.existsSync(icon)) {
            fs.copyFileSync(
              icon,
              path.join(compiler.options.output.path, icon)
            );
          }
        });

        bindings.forEach(binding => {
          html = html.replace(`{{${binding.id}}}`, binding.value);
        });
        let previewPath = indexPath.replace(".html", ".preview.html");
        fs.writeFileSync(previewPath, html);
        if (!fs.existsSync(path.join(__dirname, "builds"))) {
          fs.mkdirSync(path.join(__dirname, "builds"));
        }
        var zip = fs.createWriteStream(
          path.join(
            __dirname,
            "builds",
            `${metadata.name}-${metadata.version}.dextpl`
          )
        );
        var archive = archiver("zip");
        zip.on("close", function() {
          console.log(archive.pointer() + " total bytes");
          console.log(
            "archiver has been finalized and the output file descriptor has closed."
          );
        });
        archive.on("error", function(err) {
          throw err;
        });
        archive.pipe(zip);
        archive.directory(compiler.options.output.path, false);
        archive.finalize();
      } catch (e) {
        console.log(e);
      }
    });
  }
}
module.exports = DexTemplatePlugin;
