import { DiagramaService } from "../../services/DiagramaService.js";

const createDiagramaForm = document.getElementById('create_diagrama_form');

document.getElementById('btn_nuevo_diagrama').addEventListener('click', (event) => {
    createDiagramaForm.style.display = 'flex';
});

document.getElementById('btn_nuevo_diagrama_atras').addEventListener('click', (event) => {
    createDiagramaForm.style.display = 'none';
});

createDiagramaForm.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        const data = event.target;

        const nombre = data['diagrama_nombre'].value;        
        const idProyecto = data['idProyecto'].value;

        const response = await DiagramaService.createDiagrama({nombre, idProyecto});
        //await DiagramaService.Diagramas(response.idEmpleado);
        return false;
    } catch (error) {
        console.log(error.message)
    }
});