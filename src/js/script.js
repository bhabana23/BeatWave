// Toggle Theme Functionality
document.getElementById("toggle-theme-btn").addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }
});

// Simulated Audio State
let isPlaying = false;
let progressInterval = null;
let progressPercent = 30; // Start value
const playBtn = document.querySelector(".play-button");
const playIcon = playBtn.querySelector("i");
const progress = document.querySelector(".progress");

function startProgress() {
    stopProgress(); // Clear any existing interval
    progressInterval = setInterval(() => {
        if (progressPercent < 100) {
            progressPercent += 0.5;
            progress.style.width = `${progressPercent}%`;
        } else {
            stopProgress();
            togglePlayPause(false);
        }
    }, 1000);
}

function stopProgress() {
    clearInterval(progressInterval);
    progressInterval = null;
}

function togglePlayPause(play) {
    isPlaying = play;
    playIcon.classList.toggle("fa-play", !isPlaying);
    playIcon.classList.toggle("fa-pause", isPlaying);

    if (isPlaying) {
        startProgress();
    } else {
        stopProgress();
    }
}

playBtn.addEventListener("click", () => {
    togglePlayPause(!isPlaying);
});

// Volume Control with Icon and Slider
const volumeControl = document.querySelector(".volume-control");
volumeControl.innerHTML = "";

// Create volume icon (Font Awesome)
const volumeIcon = document.createElement("i");
volumeIcon.className = "fas fa-volume-up"; // Requires Font Awesome
volumeIcon.style.marginRight = "8px";
volumeIcon.style.color = "#333";
volumeIcon.style.fontSize = "16px";

// Create slider
const volumeSlider = document.createElement("input");
volumeSlider.type = "range";
volumeSlider.min = "0";
volumeSlider.max = "100";
volumeSlider.value = "65";
volumeSlider.style.width = "100px";
volumeSlider.style.cursor = "pointer";

// Append icon and slider
volumeControl.appendChild(volumeIcon);
volumeControl.appendChild(volumeSlider);

// Optional: Hook to real audio volume if needed
// const audio = document.querySelector("audio");
// volumeSlider.addEventListener("input", () => {
//     audio.volume = volumeSlider.value / 100;
// });

// Bottom nav button active toggle
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(item => {
    item.addEventListener("click", () => {
        navItems.forEach(btn => btn.classList.remove("active"));
        item.classList.add("active");
    });
});
