import SocketClient from "../../socket/SocketClient.js";

const editor = grapesjs.init({
    container: '#gjs',
    fromElement: false,
    height: '100%',
    width: 'auto',
    storageManager: false,
    components: `<div class="txt-red">¡Hola mundo!</div>`,
    style: `.txt-red { color: red }`,
    blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'section',
            label: '<b>Section</b>',
            attributes: { class: 'gjs-block-section' },
            content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`,
          },
          {
            id: 'text',
            label: 'Text',
            content: '<div data-gjs-type="text">Insert your text here</div>',
          },
          {
            id: 'image',
            label: 'Image',
            select: true,
            content: { type: 'image' },
            activate: true,
          },
        ],
      }
  });

  editor.on('component:add', sendChanges);
  editor.on('component:remove', sendChanges);
  editor.on('component:update', sendChanges);
  editor.on('style:property:update', sendChanges);

  function sendChanges() {
    const html = editor.getHtml();
    const css = editor.getCss();
    SocketClient.socket.emit('editor-change', { html, css });
  }

  SocketClient.socket.on('editor-change', ({ html, css }) => {
    const components = editor.DomComponents.getComponents();
    components.reset(); // limpiamos

    editor.setComponents(html);
    editor.setStyle(css);
  });
// const cambaWidth = document.getElementById('diagram').offsetWidth;
// const cambaHeight = document.getElementById('diagram').offsetHeight;

// const diagram = new UMLSequenceDiagram({ id: "diagram", width: cambaWidth, height: cambaHeight })
// const diagramContainer = document.getElementById('diagram');

// let elementSelected = null;
// let nameCount = 0;

// diagramContainer.addEventListener('click', function(event) {
//     const pointX = event.offsetX;
//     const pointY = event.offsetY;

//     const  existingElement = diagram.getElementByPoint(pointX, pointY);
//     if(!existingElement){
//         const newUmlLifeLine = new UMLLifeline({x: pointX, y: pointY})
//         newUmlLifeLine.setValue('name', `${nameCount}`);
//         nameCount++;
//         diagram.addElement(newUmlLifeLine);
//         console.log("se hallo un elemento");
//         elementSelected = null;
//     }else{
//         if(elementSelected){    
//             existingElement.setBackgroundColor('rgb(0, 255, 0)');
//             elementSelected = null;
//         }else{
//             existingElement.setBackgroundColor('rgb(255, 0, 0)');
//             elementSelected = existingElement;
//         }
        
//     }
//     diagram.draw();
//     SocketClient.emit(diagram.getXMLString());
// });

// SocketClient.socket.on('respuesta', (data) => {
//     diagram.setXMLString(data);
//     diagram.draw();
// })
