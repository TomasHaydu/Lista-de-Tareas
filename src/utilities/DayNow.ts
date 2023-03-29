export default function dayNow():string {
  let date: Date = new Date();
  let day: number | string =
    date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
  let month: number | string =
    date.getMonth() + 1 < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let year:number = date.getFullYear();
  if (Number(day) < 10) {
    return `0${day}-${month}-${year}`;
  } else {
    return `${day}-${month}-${year}`;
  }
}
