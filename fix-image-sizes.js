const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Add sizes attribute after fill
    content = content.replace(/(\s+)fill(\s+className=)/g, '$1fill$1sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"$2');
    
    fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Added sizes to Image components');
