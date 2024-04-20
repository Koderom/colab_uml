import SocketClient from "../../socket/SocketClient.js";

const cambaWidth = document.getElementById('diagram').offsetWidth;
const cambaHeight = document.getElementById('diagram').offsetHeight;

const diagram = new UMLSequenceDiagram({ id: "diagram", width: cambaWidth, height: cambaHeight })
const diagramContainer = document.getElementById('diagram');

let elementSelected = null;
let nameCount = 0;

diagramContainer.addEventListener('click', function(event) {
    const pointX = event.offsetX;
    const pointY = event.offsetY;

    const  existingElement = diagram.getElementByPoint(pointX, pointY);
    if(!existingElement){
        const newUmlLifeLine = new UMLLifeline({x: pointX, y: pointY})
        newUmlLifeLine.setValue('name', `${nameCount}`);
        nameCount++;
        diagram.addElement(newUmlLifeLine);
        console.log("se hallo un elemento");
        elementSelected = null;
    }else{
        if(elementSelected){    
            existingElement.setBackgroundColor('rgb(0, 255, 0)');
            elementSelected = null;
        }else{
            existingElement.setBackgroundColor('rgb(255, 0, 0)');
            elementSelected = existingElement;
        }
        
    }
    diagram.draw();
    SocketClient.emit(diagram.getXMLString());
});

SocketClient.socket.on('respuesta', (data) => {
    diagram.setXMLString(data);
    diagram.draw();
})
// function agregarNodosInicialesTest() {
//         const newUmlLifeLine1 = new UMLLifeline({x: 200, y: 100});
//         const newUmlLifeLine2 = new UMLLifeline({x: 300, y: 100});
//         const newUmlLifeLine3 = new UMLLifeline({x: 400, y: 100});
//         newUmlLifeLine1.setValue('name', 'nodoA');
//         newUmlLifeLine2.setValue('name', 'nodoB');
//         newUmlLifeLine3.setValue('name', 'nodoC');

//         diagram.addElement(newUmlLifeLine1);
//         diagram.addElement(newUmlLifeLine2);
//         diagram.addElement(newUmlLifeLine3);
//         diagram.draw();

//         console.log(diagram.getXMLString())
//         diagram.setXMLString(`<UMLSequenceDiagram name="Sequence diagram"><UMLLifeline id="undefined:UMLLifeline_2" x="400" y="100" width="56" height="260" backgroundColor="#c6dbdc" lineColor="#294253" lineWidth="1" tagValues=""><superitem id="stereotypes" visibleSubComponents="true"/><item id="name" value="nodoC"/></UMLLifeline><UMLLifeline id="undefined:UMLLifeline_1" x="300" y="100" width="56" height="260" backgroundColor="#c6dbdc" lineColor="#294253" lineWidth="1" tagValues=""><superitem id="stereotypes" visibleSubComponents="true"/><item id="name" value="nodoB"/></UMLLifeline><UMLLifeline id="undefined:UMLLifeline_0" x="200" y="100" width="56" height="260" backgroundColor="#c6dbdc" lineColor="#294253" lineWidth="1" tagValues=""><superitem id="stereotypes" visibleSubComponents="true"/><item id="name" value="nodoA"/></UMLLifeline></UMLSequenceDiagram>`);
//         diagram.draw();
// }
// diagramContainer.addEventListener('click', (event) => {
//     const pointX = event.offsetX;
//     const pointY = event.offsetY;

//     const  existingElement = diagram.getElementByPoint(pointX, pointY);
//     if(existingElement){
//         if(elementSelected){
//             const newRelation = new UMLSendMessage({a: elementSelected, b: existingElement});
//             diagram.addElement(newRelation);
//             nameCount += 10;
//             newRelation.updatePosition(0, pointY - elementSelected.getY());
//             elementSelected = null;
//         }else{
//             elementSelected = existingElement;
//         }
//         diagram.notifyChange();
//         diagram.draw();
//     }
    
// })

diagramContainer.addEventListener('mousemove', function(event) {
    const pointX = event.offsetX;
    const pointY = event.offsetY;

    if(elementSelected){
        elementSelected.position(pointX, pointY);
        diagram.draw();
    }
});



//agregarNodosInicialesTest();