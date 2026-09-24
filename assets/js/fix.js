const fs = require('fs');
let content = fs.readFileSync('gallery.html', 'utf8');

const regex = /<a href="([^"]+)" title="Lihat Foto" class="glightbox"><i class="bi bi-eye"><\/i><\/a>\s*<a href="[^"]+"><i class="bi bi-info-circle"><\/i><\/a>/g;

content = content.replace(regex, '<a href="$1" title="Lihat Foto" class="glightbox" style="font-size: 1rem; text-decoration: none; font-weight: 600; color: #fff;">Lihat Foto</a>');

fs.writeFileSync('gallery.html', content, 'utf8');
