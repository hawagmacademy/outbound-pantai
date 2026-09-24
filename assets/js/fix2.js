const fs = require('fs');
const glob = require('fs');

// 1. Fix gallery.html
let galleryContent = fs.readFileSync('gallery.html', 'utf8');
const galleryRegex = /<a href="([^"]+)" title="Lihat Foto" class="glightbox" style="font-size: 1rem; text-decoration: none; font-weight: 600; color: #fff;">Lihat Foto<\/a>/g;
galleryContent = galleryContent.replace(galleryRegex, '<a href="$1" class="glightbox"><i class="bi bi-eye"></i></a>');
fs.writeFileSync('gallery.html', galleryContent, 'utf8');
console.log('Fixed gallery.html');

// 2. Fix tour details (tour-*.html)
const files = [
  'tour-barat.html',
  'tour-camp.html',
  'tour-family.html',
  'tour-romantic.html',
  'tour-sendiki.html',
  'tour-snourkling.html',
  'tour-trip.html'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/Ringkasan Tur/g, 'Ringkasan Tour');
    content = content.replace(/Keunggulan Tur/g, 'Keunggulan Tour');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
});
