async function explainCode() {
  const code = document.getElementById("codeInput").value;

  if (!code) return;

  document.getElementById("output").innerText = "Loading...";

  try {
    const res = await fetch("http://localhost:3000/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    document.getElementById("output").innerText = data.explanation;

  } catch (error) {
    document.getElementById("output").innerText = "Error occurred";
  }
}