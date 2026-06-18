const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace image: any; with cloudinaryUrl?: string | null;
    content = content.replace(/^\s*image:\s*any;\s*$/gm, '    cloudinaryUrl?: string | null;');
    
    fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Fixed image types in components');
