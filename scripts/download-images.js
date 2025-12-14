const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    filename: 'hero-bg.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    filename: 'web-dev.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    filename: 'ai-solutions.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    filename: 'security.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    filename: 'academy.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    filename: 'portfolio/ecommerce.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    filename: 'portfolio/ai-prediction.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    filename: 'portfolio/security-app.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    filename: 'portfolio/lms.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    filename: 'blog/web-dev-2024.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    filename: 'blog/ai-generative.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    filename: 'blog/cybersecurity.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    filename: 'blog/cloud-computing.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    filename: 'academy/hero-bg.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    filename: 'academy/web-dev.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    filename: 'academy/ai-ml.jpg',
    directory: 'public/images'
  },
  {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    filename: 'academy/cybersecurity.jpg',
    directory: 'public/images'
  }
];

function downloadImage(url, filename, directory) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(directory, filename);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages() {
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename, image.directory);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error);
    }
  }
}

downloadAllImages(); 