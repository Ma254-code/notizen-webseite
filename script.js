const API_BASE = "https://workspace.marlonalbrechtl.repl.co"; // <-- Ersetze mit deinem Link

async function loadNotes(user) {
  const res = await fetch(`${API_BASE}/notes/${user}`);
  const notes = await res.json();
  const ul = document.getElementById("notes-list");
  ul.innerHTML = "";
  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = `${note.date.split("T")[0]}: ${note.content}`;
    ul.appendChild(li);
  });
}

async function addNote(user) {
  const textarea = document.getElementById("note-input");
  const content = textarea.value;
  let password = "";

  if (user !== "public") password = prompt("Passwort:");

  const res = await fetch(`${API_BASE}/notes/${user}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, password })
  });

  if (res.ok) {
    textarea.value = "";
    loadNotes(user);
  } else {
    alert("Fehler: " + (await res.json()).error);
  }
}

// Automatisch laden
const page = location.pathname.includes("marlon")
  ? "marlon"
  : location.pathname.includes("mats")
  ? "mats"
  : "public";
loadNotes(page);

