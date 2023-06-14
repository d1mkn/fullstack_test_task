const form = document.getElementById("user-form");
const formSubmit = form.querySelector('input[type="submit"]');
const userName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => onFormSubmit(e));

function onFormSubmit(e) {
  e.preventDefault();

  const emailPattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (!emailPattern.test(email.value)) {
    alert("Enter your email in the correct format: word@mail.domain");
    return;
  }

  const url = "https://api.byteplex.info/api/test/contact/";
  const data = {
    name: userName.value,
    email: email.value,
    message: message.value,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        resetForm();
        console.log("The data was sent successfully.");
      } else {
        alert("Something went wrong");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function resetForm() {
  userName.value = "";
  email.value = "";
  message.value = "";
}
