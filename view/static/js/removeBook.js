const elements = document.querySelectorAll(".delete-book-btn");

elements.forEach(btn => {
  btn.addEventListener("click", async (e) => {
    const bookId = e.currentTarget  .dataset.bookId;

    const response = await fetch(`/admin/api/remove/${bookId}`, {
      method: "POST"
    });

    if (!response.ok) {
      showError("Failed to delete");
    } else {
      window.location.reload();
    }
  });
});

function showError(message) {
  const body = document.getElementById("errorToastBody")
  body.textContent = message

  const toastEl = document.getElementById("errorToast")
  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000
  })

  toast.show()
}