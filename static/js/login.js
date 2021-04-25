async function loginValidate(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const response = await axios.post("/login", { username, password });
  if (response.status === 203) {
    document.getElementById("errorMessage").innerText =
      "Wrong Email or Password!";
  } else {
    window.location = "/";
  }
}

document.forms[0].addEventListener("submit", loginValidate);
