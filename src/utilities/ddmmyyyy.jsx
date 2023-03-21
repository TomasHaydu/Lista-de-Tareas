export default function dayMonthYear (fecha) {
    const [year, month, day] = fecha.split("-");

    const result = [day, month, year].join("-");

    return result;
  };