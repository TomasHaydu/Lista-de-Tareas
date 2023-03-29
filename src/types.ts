export interface Tarea {
  descripcion: string;
  fecha: string;
  id?: string;
  importancia: number;
  titulo: string;
}  

export const InitialValue:Tarea = {
  descripcion: "",
  fecha: "",
  id: "",
  importancia: 2,
  titulo: "",
}