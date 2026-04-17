console.log(data);
async function explainCode() {
  const code = document.getElementById("codeInput").value;

  if (!code) return;

  document.getElementById("output").innerText = "Loading...";

  try {
    const res = await fetch("https://code-explainer-web-api.onrender.com/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    // Better handling
    if (data.explanation) {
      document.getElementById("output").innerText = data.explanation;
    } else if (data.error) {
      document.getElementById("output").innerText = "Error: " + data.error;
    } else {
      document.getElementById("output").innerText = "No explanation received";
    }

  } catch (error) {
    document.getElementById("output").innerText = "Server error";
  }
}