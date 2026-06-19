const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedFiles = 0;

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // We removed transition-all earlier. Let's add transition-colors duration-150 ease-out to elements that have hover:bg-
    content = content.replace(/(hover:bg-[a-zA-Z0-9/-]+)/g, '$1 transition-colors duration-150 ease-out');
    // Deduplicate in case it was already added or existed
    content = content.replace(/(transition-colors\s+duration-150\s+ease-out\s*)+/g, 'transition-colors duration-150 ease-out ');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedFiles++;
    }
  }
});

console.log('Added correct transitions to ' + modifiedFiles + ' files.');
