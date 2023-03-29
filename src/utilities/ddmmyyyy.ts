export default function dayMonthYear (fecha:string):string {
    const [year, month, day] = fecha.split("-");

    const result:string = [day, month, year].join("-");

    return result;
  };