const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace .image ? with .cloudinaryUrl ?
    content = content.replace(/\.image\s*\?/g, '.cloudinaryUrl ?');
    
    fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Fixed image ternary checks');
