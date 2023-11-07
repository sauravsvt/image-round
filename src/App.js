import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    
    image.onload = () => {
      const size = Math.min(image.width, image.height);
      const x = (image.width - size) / 2;
      const y = (image.height - size) / 2;
      
      canvas.width = size;
      canvas.height = size;
      
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
      context.clip();
      context.drawImage(image, x, y, size, size, 0, 0, size, size);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.download = 'round-image.png';
      downloadLink.click();
    };
    
    image.src = imageSrc;
  };

  return (
    <div className="App">
      <section className="image-upload-section">
        <input type="file" onChange={handleImageChange} accept="image/*" />
        {imageSrc && (
          <div className="image-preview-container">
            <canvas ref={canvasRef} className="image-canvas" style={{ display: 'none' }}></canvas>
            <img src={imageSrc} className="round-image" alt="Preview" />
            <button onClick={downloadImage}>Download Round Image</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
