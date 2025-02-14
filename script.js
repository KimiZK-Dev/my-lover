// Hiệu ứng tim bay nền
function createFloatingHearts() {
	const bgHearts = document.querySelector(".bg-hearts");
	const numberOfHearts = 30;
	bgHearts.innerHTML = "";
	for (let i = 0; i < numberOfHearts; i++) {
		const heart = document.createElement("div");
		heart.innerHTML = "❤️";
		heart.classList.add("floating-heart");
		heart.style.left = `${Math.random() * 100}%`;
		heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
		heart.style.fontSize = `${Math.random() * 20 + 10}px`;
		bgHearts.appendChild(heart);
	}
}
createFloatingHearts();
setInterval(createFloatingHearts, 4000);

// Hiệu ứng icon rơi khi nhấn "Đồng ý"
function createFallingElement() {
	const elements = ["🌹", "💝", "💌", "💕", "🎀"];
	const element = document.createElement("div");
	element.textContent = elements[Math.floor(Math.random() * elements.length)];
	element.classList.add("falling-element");
	element.style.left = Math.random() * 100 + "vw";
	element.style.fontSize = `${Math.random() * 20 + 20}px`;
	element.style.animationDuration = 3 + Math.random() * 2 + "s";
	document.body.appendChild(element);
	element.addEventListener("animationend", () => element.remove());
}

// --- Xử lý nút "Từ chối" ---
const noBtn = document.getElementById("noBtn");
const mainContainer = document.getElementById("mainContainer");
const rejectMessage = document.getElementById("rejectMessage");

// Lưu vị trí ban đầu của nút "Từ chối" (relative so với container)
let initBtnX = 0,
	initBtnY = 0;
window.addEventListener("load", () => {
	const containerRect = mainContainer.getBoundingClientRect();
	const btnRect = noBtn.getBoundingClientRect();
	initBtnX = btnRect.left - containerRect.left;
	initBtnY = btnRect.top - containerRect.top;
});

// Khi hover, chọn vị trí ngẫu nhiên mới trong toàn bộ vùng hợp lệ của container
noBtn.addEventListener("mouseenter", () => {
	const containerWidth = mainContainer.clientWidth;
	const containerHeight = mainContainer.clientHeight;
	const btnWidth = noBtn.offsetWidth;
	const btnHeight = noBtn.offsetHeight;
	const minX = -initBtnX;
	const maxX = containerWidth - initBtnX - btnWidth;
	const minY = -initBtnY;
	const maxY = containerHeight - initBtnY - btnHeight;
	const newX = Math.random() * (maxX - minX) + minX;
	const newY = Math.random() * (maxY - minY) + minY;
	noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
});

// Khi click nút "Từ chối": ẩn container và hiển thị modal thông báo từ chối
noBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	mainContainer.style.display = "none";
	rejectMessage.style.display = "block";
});

// Xử lý nút "Đồng ý"
document.getElementById("yesBtn").addEventListener("click", function () {
	mainContainer.style.display = "none";
	document.getElementById("successMessage").style.display = "block";
	const fallingInterval = setInterval(createFallingElement, 200);
	setTimeout(() => clearInterval(fallingInterval), 10000);
});

// Xử lý nút "Quay lại" trong thông báo từ chối
document.getElementById("backBtn").addEventListener("click", () => {
	rejectMessage.style.display = "none";
	mainContainer.style.display = "block";
});
