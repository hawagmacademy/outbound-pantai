const fs = require('fs');

const files = ['detail-blog-1.html', 'detail-blog-2.html', 'detail-blog-3.html', 'detail-blog-4.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace category links with spans
    content = content.replace(/<a href="#" class="category">(.*?)<\/a>/g, '<span class="category">$1</span>');

    // Remove text inside share buttons
    content = content.replace(/<span>Bagikan di (.*?)<\/span>/g, '');

    // For detail-blog-2, 3, 4, it might be other text, so just in case, match the whole share-button span.
    content = content.replace(/<a href="#" class="share-button (.*?)">\s*<i class="(.*?)"><\/i>\s*<span>(.*?)<\/span>\s*<\/a>/g, '<a href="#" class="share-button $1">\n                  <i class="$2"></i>\n                </a>');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});
