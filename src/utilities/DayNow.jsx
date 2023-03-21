export default function dayNow () {
    let date = new Date();
    let day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
      return `0${day}-${month}-${year}`;
    } else {
      return `${day}-${month}-${year}`;
    }
  };