import { kml } from "@tmcw/togeojson";
import './style.css';

// Handle the dropfile event
function onDrop(event: DragEvent) {
  event.preventDefault();
  const reader = new FileReader();
  const selectedFile = event.dataTransfer.files[0];
  if (selectedFile) {
    reader.onload = (ev) => {
      handleDroppedFileToMap(reader.result as string);
    };
    reader.readAsText(selectedFile, 'text/xml');
  }
}

// Suppress the default browser behavior when dragging a file in the dropzone
function dragOverHandler(ev) {
  ev.preventDefault();
}

// Convert the dragged kml file
function handleDroppedFileToMap(fileResult: string) {
  const geojsonFile = kml(new DOMParser().parseFromString(fileResult, 'text/xml'));
  console.log(geojsonFile);
  // Display our dragged file in a fancy way
  const appDiv: HTMLElement = document.getElementById('app');
  appDiv.innerHTML = `<pre><code class="geojson">${JSON.stringify(
    geojsonFile,
    null,
    4
  )}</code></pre>`;
}

// Get our dropzone
const dropzone = document.querySelector('.dropzone');
// Bind the necessary event listeners to our dropzone
dropzone.addEventListener('drop', onDrop);
dropzone.addEventListener('dragover', dragOverHandler);
