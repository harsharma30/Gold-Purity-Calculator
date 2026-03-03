const liquidData = {
    diesel: { density: 0.84 },
    alcohol: { density: 0.786 },
    kerosene: { density: 0.81 },
    water: { density: 0.998 }
};

// Theme Toggle
const toggleBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    }
});

function calculatePurity() {

    const wa = parseFloat(document.getElementById("weightAir").value);
    const wl = parseFloat(document.getElementById("weightLiquid").value);
    const liquid = document.getElementById("liquidType").value;
    const resultDiv = document.getElementById("result");

    if (isNaN(wa) || isNaN(wl)) {
        resultDiv.innerHTML = "Please enter valid values.";
        resultDiv.classList.add("show");
        return;
    }

    if (wa <= wl) {
        resultDiv.innerHTML = "Weight in air must be greater than weight in liquid.";
        resultDiv.classList.add("show");
        return;
    }

    const liquidDensity = liquidData[liquid].density;
    const sampleDensity = (wa / (wa - wl)) * liquidDensity;
    const purity = (sampleDensity / 19.32) * 100;
    const karat = (purity * 24) / 100;

    resultDiv.innerHTML = `
        Density: ${sampleDensity.toFixed(3)} g/cm³ <br>
        Purity: ${purity.toFixed(2)}% <br>
        Karat: ${karat.toFixed(2)}K
    `;

    resultDiv.classList.add("show");
}

function resetFields() {
    document.getElementById("weightAir").value = "";
    document.getElementById("weightLiquid").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").classList.remove("show");
}