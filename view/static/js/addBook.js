const form = document.querySelector("#book-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const res = await fetch("/admin/api/add", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (res.ok) {
    showSuccess("Book has been added.");
  } else {
    showFail(`Failed to add book: ${data.error}`);
  }
});

function showSuccess(message) {
  const body = document.getElementById("successToastBody")
  body.textContent = message

  const toastEl = document.getElementById("successToast")
  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000
  })

  toast.show()
}

function showFail(message) {
  const body = document.getElementById("failToastBody")
  body.textContent = message

  const toastEl = document.getElementById("failToast")
  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000
  })

  toast.show()
}