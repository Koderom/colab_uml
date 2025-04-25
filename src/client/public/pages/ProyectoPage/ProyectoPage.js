import { EditorService } from "../../services/EditorService.js";
import { ProyectoService } from "../../services/ProyectoService.js";

// VER PROYECTO
document.addEventListener('DOMContentLoaded', () => {
    const btnsVer = document.querySelectorAll('#btn_ver_proyecto');
    btnsVer.forEach(btn => {
      btn.addEventListener('click', async () => {
        const idEmpleado = btn.dataset.idEmpleado;
        const idProyecto = btn.dataset.idProyecto;
           await EditorService.getEditor(idProyecto);
      });
    });

    // Botones "compartir"
    const btnsCompartir = document.querySelectorAll('#btn_join_proyecto');
    btnsCompartir.forEach(btn => {
      btn.addEventListener('click', () => {
        const joinCode = btn.dataset.joinCode;
        navigator.clipboard.writeText(joinCode)
          .then(() => alert('Código copiado: ' + joinCode))
          .catch(err => console.error('Error al copiar:', err));
        });
    });
})



// CREAR PROYECTO
const nuevoProyectoForm = document.getElementById("nuevo_proyecto_form");
document.getElementById("btn_nuevo_proyecto_salir").addEventListener('click', (event) => {
    nuevoProyectoForm.style.display = 'none';
});

document.getElementById("btn_nuevo_proyecto").addEventListener('click', (event) => {
    nuevoProyectoForm.style.display = 'flex';
})


nuevoProyectoForm.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        console.log("click")
        const data = event.target;
        const nombre = data['nombre'].value;
        const descripcion = data['descripcion'].value;
        const idEmpleado = data['idEmpleado'].value;
        console.log({nombre, descripcion, idEmpleado});
        const response = await ProyectoService.createProyecto({nombre, descripcion, idEmpleado});
        await ProyectoService.proyectos(response.idEmpleado);
        return false;
    } catch (error) {
        console.log(error.message)
    }
})


// //Unirse a proyecto

const unirseProyectoForm = document.getElementById("unirse_proyecto_form");

document.getElementById("btn_unirse_proyecto_salir").addEventListener('click', (event) => {
    unirseProyectoForm.style.display = 'none';
});

document.getElementById("btn_unirse_proyecto").addEventListener('click', (event) => {
    unirseProyectoForm.style.display = 'flex';
})


unirseProyectoForm.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        const data = event.target;
        const idProyecto = data['id_proyecto'].value;
        const idEmpleado = data['idEmpleado'].value;
        const response = await ProyectoService.unirseProyecto({idProyecto, idEmpleado});
        await ProyectoService.proyectos(response.idEmpleado);
        return false;
    } catch (error) {
        console.log(error.message)
    }
})


// // function copiarAlPortapapeles(texto) {
// //     navigator.clipboard.writeText(joinCode)
// //           .then(() => alert('Código copiado: ' + texto))
// //           .catch(err => console.error('Error al copiar:', err));
// // }