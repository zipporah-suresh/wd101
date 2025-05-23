document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("userForm");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const dob = document.getElementById("dob");
  const terms = document.getElementById("terms");
  const tableBody = document.getElementById("tableBody");

  dob.max = new Date().toISOString().split("T")[0];

  function calculateAge(dobValue) {
    const birthDate = new Date(dobValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function isValidEmail(emailValue) {
    return emailValue.includes("@");
  }

  function removeNoEntryRow() {
    const noRow = document.getElementById("noEntriesRow");
    if (noRow) noRow.remove();
  }

  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("formEntries")) || [];
    tableBody.innerHTML = "";

    if (entries.length === 0) {
      tableBody.innerHTML = `
        <tr id="noEntriesRow">
          <td colspan="5" style="text-align:center; font-style:italic;">
            No entries yet.
          </td>
        </tr>
      `;
      return;
    }

    removeNoEntryRow();

    entries.forEach(entry => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.terms}</td>
      `;
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!isValidEmail(email.value)) {
      alert("Email must include '@' symbol.");
      return;
    }

    const age = calculateAge(dob.value);
    if (age < 18 || age > 55) {
      alert("Age must be between 18 and 55.");
      return;
    }

    const entry = {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
      dob: dob.value,
      terms: terms.checked
    };

    const existingEntries = JSON.parse(localStorage.getItem("formEntries")) || [];
    existingEntries.push(entry);
    localStorage.setItem("formEntries", JSON.stringify(existingEntries));

    loadEntries();
    form.reset();
  });

  loadEntries();
});
