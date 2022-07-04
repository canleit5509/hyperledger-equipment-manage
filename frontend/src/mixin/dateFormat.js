let today = new Date();
let time = `${
    (today.getHours() < 10 ? "0" : "") +
    today.getHours() +
    ":" +
    (today.getMinutes() < 10 ? "0" : "") +
    today.getMinutes() +
    ":" +
    (today.getSeconds() < 10 ? "0" : "") +
    today.getSeconds()
  }`

const dateNow = `${
    today.getFullYear() +
    "-" +
    ((today.getMonth() < 10 ? "0" : "") +
      (today.getMonth() + 1)) +
    "-" +
    ((today.getDate() < 10 ? "0" : "") + today.getDate())
  } ${time}`

  const dateAfterMonth = `${
    (today.getMonth() < 11
      ? today.getFullYear() +
        "-" +
        ((today.getMonth() < 10 ? "0" : "") +
          (today.getMonth() + 2))
      : today.getFullYear() +
        1 +
        "-" +
        ((today.getMonth() < 10 ? "0" : "") +
          (today.getMonth() + 1))) +
    "-" +
    ((today.getDate() < 10 ? "0" : "") + today.getDate())
  } ${time}`


  export default {
      dateNow,
      dateAfterMonth
  }