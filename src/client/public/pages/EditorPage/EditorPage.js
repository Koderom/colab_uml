import SocketClient from "../../socket/SocketClient.js";

document.addEventListener('DOMContentLoaded', () => {

  const editor = grapesjs.init({
    container: '#gjs',
    fromElement: false,
    height: '100%',
    width: 'auto',
    storageManager: false,
    components: editorData.html,
    style: editorData.css,
    plugins: ['gjs-blocks-basic'],
    pluginsOpts: {
      'gjs-blocks-basic': {
        flexGrid: true, // Si quieres usar filas y columnas con Flexbox
        blocks: ['column1', 'column2', 'column3', 'text', 'link', 'image', 'video', 'map', 'form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'], // Qué bloques quieres
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

})