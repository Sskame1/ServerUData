'use client';

import { useState } from 'react';
import Image from 'next/image';
import './Gallery.css';

type ContentItem = {
  type: 'folder' | 'file';
  name: string;
  path: string;
  isImage?: boolean;
  children?: ContentItem[];
};

type Props = {
  content: ContentItem[];
};

export default function SimpleGallery({ content }: Props) {
  const [currentFolder, setCurrentFolder] = useState<ContentItem[]>(content);
  const [folderPath, setFolderPath] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<{path: string; name: string; isImage: boolean} | null>(null);

  const openFolder = (folder: ContentItem) => {
    if (folder.children) {
      setCurrentFolder(folder.children);
      setFolderPath([...folderPath, folder.name]);
    }
  };

  const goBack = () => {
    if (folderPath.length > 0) {
      // Просто возвращаемся в корень (для простоты)
      setCurrentFolder(content);
      setFolderPath([]);
    }
  };

  const openFile = (file: ContentItem) => {
    if (file.type === 'file' && file.isImage) {
      setSelectedFile({
        path: file.path,
        name: file.name,
        isImage: file.isImage
      });
    }
  };

  return (
    <div className="gallery">
      {/* Навигация */}
      {folderPath.length > 0 && (
        <button onClick={goBack} className="back-button">
          ← Назад
        </button>
      )}
      
      <h2>{folderPath.length > 0 ? folderPath[folderPath.length - 1] : 'Галерея'}</h2>

      {/* Контент */}
      <div className="file-grid">
        {currentFolder.map((item, index) => (
          <div 
            key={index} 
            className="file-item"
            onClick={() => item.type === 'folder' ? openFolder(item) : openFile(item)}
          >
            {item.type === 'folder' ? (
              <>
                <div className="folder-icon">📁</div>
                <span>{item.name}</span>
              </>
            ) : (
              <>
                {item.isImage ? (
                  <div className="image-preview">
                    <Image 
                      src={item.path}
                      alt={item.name}
                      width={150}
                      height={150}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div className="video-icon">🎬</div>
                )}
                <span>{item.name}</span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {selectedFile && (
        <div className="modal" onClick={() => setSelectedFile(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setSelectedFile(null)}>×</button>
            {selectedFile.isImage ? (
              <Image 
                src={selectedFile.path}
                alt={selectedFile.name}
                width={800}
                height={600}
                style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
              />
            ) : (
              <video src={selectedFile.path} controls />
            )}
          </div>
        </div>
      )}
    </div>
  );
}