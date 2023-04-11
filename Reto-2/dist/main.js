'use strict'
const saveLista = "listaTareas";
document.addEventListener("DOMContentLoaded", () => {
    let tareas = [];
    const ids = document.getElementById("ids");
    const btnEnviar = document.getElementById("botonE");
    const listaTareas = document.getElementById("tareas");
    const txt = document.getElementById("tarea");
    const totalTareas = document.getElementById("tareaT");
    const complet = document.getElementById("tareaR");
    const num2 = document.createElement("num")
    complet.innerHTML = "Tareas completas:";
    const num = document.createElement("num")
    totalTareas.innerHTML = "Total Tareas:";
    num.textContent = 0;
    num2.textContent = 0;
    totalTareas.appendChild(num);
    complet.appendChild(num2);

    const listTareas = () => {
        const lista = JSON.parse(localStorage.getItem(saveLista));/* es para leer los datos guardados y convertirlos en un objeto */
        if (lista) {
            return lista
        } else {
            return [];
        }
    }

    const saveTarea = () => {
        localStorage.setItem(saveLista, JSON.stringify(tareas));/* es para guerdar datos y convertirlos en json */
    }

    btnEnviar.onclick = () => {
        const tarea = txt.value;
        if (!tarea) {
            return;
        }

        tareas.push({tarea: tarea, terminada: false});
        txt.value = "";
        saveTarea();
        reloadList();
    };

    const reloadList = () => {
        listaTareas.innerHTML = "";
        ids.innerHTML = "";
        let contador = 0;
        let tareasCompletadas = 0;
        let contenedor = Math.floor(Math.random() * 99);/* Esto es para generar un numero aleatorio en 0 y 99 y que no sea decimal */

        for (const [indice, tarea] of tareas.entries()) {
            const figuraX = document.createElement("a");
            figuraX.innerHTML = "X";
            figuraX
                .classList
                .add("borrar")
            figuraX.href = "";
            figuraX.onclick = (e) => {
                e.preventDefault()
                if (!confirm("¿Quiere eliminar la tarea?")) {
                    return;
                }

                tareas.splice(indice, 1);
                contenedor = contenedor - 1;
                contador = contador - 1;
                tareasCompletadas = tareasCompletadas - 1;
                num.textContent = contador;
                num2.textContent = tareasCompletadas;
                saveTarea();
                reloadList();
            }

            const span = document.createElement("span");
            span.textContent = tarea.tarea;
            const span2 = document.createElement("span");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.onchange = function () {

                if (this.checked) {
                    tareas[indice].terminada = true;
                } else {
                    tareas[indice].terminada = false;
                }

                contenedor = contenedor - 1;
                contador = contador - 1;
                num.textContent = contador;
                saveTarea();
                reloadList();
            }

            contador = contador + 1;
            num.textContent = contador;

            if (tarea.terminada) {
                checkbox.checked = true;
                span
                    .classList
                    .add("completas");
                tareasCompletadas = tareasCompletadas + 1;
            }

            span2.textContent = contenedor;
            span
                .classList
                .add("textoYformas")
            span2
                .classList
                .add("textoYformas")
            contenedor = Math.floor(Math.random() * 99);
            const li = document.createElement("li");
            num2.textContent = tareasCompletadas;
            const li2 = document.createElement("li");
            totalTareas.appendChild(num);
            complet.appendChild(num2);
            li.appendChild(span);
            li.appendChild(figuraX);
            li.appendChild(checkbox);
            listaTareas.appendChild(li);
            li2.appendChild(span2);
            ids.appendChild(li2);
        }
    }

    tareas = listTareas()
    reloadList();
});