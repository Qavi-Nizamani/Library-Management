console.log("Getting Users");
getUsers();
function getUsers() {
  fetch("/users/getUsers", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset = UTF-8",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      populate(data);
    });
}

function populate(data) {
  let tBody = document.getElementById("tBody");
  // console.log(data);
  tBody.innerHTML = "";
  for (let row of JSON.parse(data)) {
    // console.log(row);
    tBody.innerHTML += `<tr>
                <td>${row.name}</td>
                <td>${row.phone}</td>
                <td>${row.email}</td>
                <td>${row.address}</td>
              </tr>
    `;
  }
}
// starter JavaScript for disabling form submissions if there are invalid fields
// (function () {
//   "use strict";

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll(".needs-validation");

//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms).forEach(function (form) {
//     form.addEventListener(
//       "submit",
//       function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault();
//           event.stopPropagation();
//         }
//         form.classList.add("was-validated");
//       },
//       false
//     );
//   });
// })();
