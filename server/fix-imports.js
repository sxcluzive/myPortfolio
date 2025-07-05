import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function addJsExtensions(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      addJsExtensions(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Add .js extension to relative imports that don't already have it
      content = content.replace(
        /from\s+['"](\.\/[^'"]*?)['"]/g,
        (match, importPath) => {
          if (!importPath.endsWith('.js') && !importPath.includes('*')) {
            return `from '${importPath}.js'`;
          }
          return match;
        }
      );
      
      // Also handle imports without ./ prefix
      content = content.replace(
        /from\s+['"]([^'"]*?)['"]/g,
        (match, importPath) => {
          if (importPath.startsWith('./') && !importPath.endsWith('.js') && !importPath.includes('*') && !importPath.includes('@')) {
            return `from '${importPath}.js'`;
          }
          return match;
        }
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed imports in: ${filePath}`);
    }
  }
}

console.log('Adding .js extensions to imports...');
addJsExtensions(path.join(__dirname, 'dist'));
console.log('Import fixes completed!'); 