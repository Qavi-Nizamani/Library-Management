async function signupValidate(e) {
  console.log("signupValidate");
  e.preventDefault();
  const username = document.getElementById("username").value;
  const name = document.getElementById("name").value;
  const phone = parseInt(document.getElementById("phone").value);
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let errors = document.getElementsByClassName("invalid-feedback");

  let errorMessage = document.getElementById("errorMessage");
  let isValidate = false;
  if (phone >= 3000000000) {
    if (password === confirmPassword) {
      isValidate = true;
    } else {
      errorMessage.innerText = "Password Mismatch";
    }
  } else {
    errorMessage.innerText = "Please Enter a correct Phone Number";
  }
  if (isValidate) {
    const msg = await axios.post("/signup", {
      username,
      name,
      email,
      phone,
      address,
      password,
      confirmPassword,
    });
    if (msg.status === 203) {
      errorMessage.innerText = msg.data;
    } else {
      errorMessage.innerHTML = "Account Created!";
      window.location = "/";
    }
  }
}

document.forms[0].addEventListener("submit", signupValidate);
