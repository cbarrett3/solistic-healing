const fs = require('fs');
const path = require('path');
const https = require('https');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Subtle nature-based images from Unsplash
const images = [
  {
    name: 'mind-body.jpg',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop',
    description: 'Calm water with light reflections - perfect for mind-body connection'
  },
  {
    name: 'ketamine-science.jpg',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1000&auto=format&fit=crop',
    description: 'Abstract light patterns - suitable for science/research topics'
  },
  {
    name: 'mindfulness.jpg',
    url: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=1000&auto=format&fit=crop',
    description: 'Peaceful mountain landscape - ideal for mindfulness'
  },
  {
    name: 'trauma-care.jpg',
    url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1000&auto=format&fit=crop',
    description: 'Gentle sunlight through trees - symbolic for healing and care'
  },
  {
    name: 'psychedelics.jpg',
    url: 'https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=1000&auto=format&fit=crop',
    description: 'Subtle colorful sky - appropriate for psychedelic topics without being too literal'
  }
];

// Download each image
images.forEach(image => {
  const filePath = path.join(imagesDir, image.name);
  const file = fs.createWriteStream(filePath);
  
  console.log(`Downloading ${image.name}...`);
  
  https.get(image.url, response => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${image.name} successfully!`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${image.name}: ${err.message}`);
  });
});
