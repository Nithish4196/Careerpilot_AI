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

    const regexes = [
      /\s*animate-in\s+fade-in\s+slide-in-from-[a-z]+(?:-\d+)?\s+duration-\d+\s*/g,
      /\s*animate-in\s+slide-in-from-[a-z]+(?:-\d+)?\s+fade-in\s+duration-\d+\s*/g,
      /\s*animate-in\s+fade-in\s+slide-in-from-[a-z]+(?:-\d+)?\s*/g,
      /\s*animate-in\s+fade-in\s+duration-\d+\s*/g,
      /\s*animate-in\s+fade-in\s+zoom-in\s+duration-\d+\s*/g,
      /\s*animate-in\s+fade-in\s+zoom-in-95\s+duration-\d+\s*/g,
      /\s*animate-in\s+zoom-in-95\s+duration-\d+\s*/g,
      /\s*animate-in\s+zoom-in-95\s*/g,
      /\s*animate-in\s+fade-in\s*/g,
      /\s*animate-in\s+slide-in-from-[a-z]+(?:-\d+)?\s*/g,
      /\s*animate-in\s+zoom-in(?:-95)?\s*/g,
      /\s*hover:-translate-y-\d+(\.\d+)?\s*/g,
      /\s*hover:shadow-xl\s*/g,
      /\s*hover:shadow-lg\s*/g,
      /\s*backdrop-blur-sm\s*/g,
      /\s*backdrop-blur-\[2px\]\s*/g,
      /\s*duration-500\s*/g,
      /\s*duration-300\s*/g,
      /\s*transition-all\s*/g
    ];

    regexes.forEach(regex => {
      content = content.replace(regex, ' ');
    });

    // We removed transition-all, let's add transition-colors duration-150 where needed.
    // First, let's fix empty classNames
    content = content.replace(/className=\"\s+/g, 'className=\"');
    content = content.replace(/\s+\"/g, '\"');
    content = content.replace(/className={`\s+/g, 'className={`');
    content = content.replace(/\s+`}/g, '`}');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedFiles++;
    }
  }
});

console.log('Modified ' + modifiedFiles + ' files.');
