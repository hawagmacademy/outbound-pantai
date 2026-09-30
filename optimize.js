const fs = require('fs');
const path = require('path');

const dir = 'd:/GM/Tour-pro/Tour-pro';

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'assets' && file !== 'forms' && file !== '.vscode') {
        processDirectory(fullPath);
      }
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Fix main.min.css render blocking
      const cssTarget = '<link href="assets/css/main.min.css" rel="stylesheet"/>';
      const cssReplacement = '<link as="style" href="assets/css/main.min.css" onload="this.onload=null;this.rel=\'stylesheet\'" rel="preload"/><noscript><link href="assets/css/main.min.css" rel="stylesheet"/></noscript>';
      if (content.includes(cssTarget)) {
        content = content.replace(new RegExp(cssTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), cssReplacement);
        modified = true;
      }

      // Fix logo lazy loading
      const logoTarget = 'loading="lazy" src="assets/img/logo.webp"';
      const logoReplacement = 'loading="eager" src="assets/img/logo.webp"';
      if (content.includes(logoTarget)) {
        content = content.replace(new RegExp(logoTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), logoReplacement);
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(dir);
console.log('Done');
