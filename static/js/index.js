fetch("", {
  method: "GET",
  headers: {
    "Content-type": "application/json; charset = UTF-8",
  },
})
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
  });
