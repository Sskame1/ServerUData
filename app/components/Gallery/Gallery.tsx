import path from "path";
import { promises as fs} from 'fs';
import "./Gallery.css"
import SimpleGallery from "./SimpleGallery";

export default async function Gallery() {
  const dataDir = path.join(process.cwd(), '/public/data');
  
  // Функция для рекурсивного чтения всех папок и файлов
  async function readAllContent(dir: string, basePath: string = ''): Promise<any[]> {
    const items = await fs.readdir(dir, { withFileTypes: true });
    const result = [];
    
    for (const item of items) {
      const itemPath = path.join(dir, item.name);
      const itemUrlPath = path.join(basePath, item.name);
      
      if (item.isDirectory()) {
        // Это папка - рекурсивно читаем её содержимое
        const children = await readAllContent(itemPath, itemUrlPath);
        result.push({
          type: 'folder',
          name: item.name,
          path: itemUrlPath,
          children: children
        });
      } else {
        // Это файл
        result.push({
          type: 'file',
          name: item.name,
          path: `/data/${itemUrlPath}`,
          isImage: /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)
        });
      }
    }
    
    return result;
  }
  
  const content = await readAllContent(dataDir);
  
  return <SimpleGallery content={content} />
}