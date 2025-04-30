import { EditorService } from "../../services/EditorService.js";
import SocketClient from "../../socket/SocketClient.js";

document.addEventListener('DOMContentLoaded', () => {
  editorData = JSON.parse( decodeBase64Utf8(editorData))
  console.log(editorData);
  const editor = grapesjs.init({
    container: '#gjs',
    fromElement: false,
    height: '100%',
    width: 'auto',
    storageManager: false,
    components: editorData.html||'',
    style: editorData.css||'',
    plugins: [
      'gjs-blocks-basic',
      'grapesjs-plugin-forms',
      'grapesjs-navbar',
      'grapesjs-preset-webpage',
      'grapesjs-blocks-bootstrap4'
    ],
    pluginsOpts: {
      'gjs-blocks-basic': {
        flexGrid: true, // Si quieres usar filas y columnas con Flexbox
        blocks: ['column1', 'column2', 'column3', 'text', 'link', 'image', 'video', 'map', 'form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'], // Qué bloques quieres
      },
      'grapesjs-plugin-forms': {
        blocks: ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio']
      },
      'grapesjs-preset-webpage' :{
        useCustomTheme: false
      }
    }

  });

  const editorElement = document.getElementById('gjs');
  const idEditor = editorElement.dataset.idEditor;
  let isRemoteChange = false;

  SocketClient.socket.emit('join-editor', idEditor);

  editor.on('component:add', sendChanges);
  editor.on('component:remove', sendChanges);
  editor.on('component:update', sendChanges);
  editor.on('style:property:update', sendChanges);

  function sendChanges() {
    if(isRemoteChange) return;
    const html = editor.getHtml();
    const css = editor.getCss();
    SocketClient.socket.emit('editor-change', {id: idEditor, data : { html, css }} );
  }

  SocketClient.socket.on('editor-change', ({ html, css }) => {
    isRemoteChange = true;
    const components = editor.DomComponents.getComponents();
    components.reset(); // limpiamos
    editor.setComponents(html);
    editor.setStyle(css);
    isRemoteChange = false;
  });
  
  const btnExport = document.getElementById("export-button");
  btnExport.addEventListener('click', (event) => {
      const html = editor.getHtml();
      console.log(html);
      const css = editor.getCss();
      console.log(css);
      EditorService.generarCodigoAngular({html, css});
  });
})

function decodeBase64Utf8(base64String) {
  try {
    const binaryString = atob(base64String);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8');
    const decodedString = decoder.decode(bytes);
    return decodedString;
  } catch (e) {
    console.error("Error al decodificar Base64:", e);
    throw new Error("Entrada Base64 inválida o error de decodificación.");
  }
}