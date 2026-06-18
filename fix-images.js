const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Remove sanity imports
    content = content.replace(/import\s+{\s*urlFor\s*}\s+from\s+['"]@\/sanity\/client['"];?\n?/g, '');
    content = content.replace(/import\s+{\s*urlFor\s*}\s+from\s+['"]@\/sanity\/lib\/image['"];?\n?/g, '');
    
    // Replace urlFor(x.image).url() with x.cloudinaryUrl
    content = content.replace(/urlFor\(([^.]+)\.image\)\.url\(\)/g, '$1.cloudinaryUrl');
    
    fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Fixed images in components');
