
export default function generarId ():string {
    const random:string = Math.random().toString(36).substring(2);
    const fecha:string = Date.now().toString(36);

    return random + fecha;
  };