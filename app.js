// const $color = document.querySelector("#nigth");
const $btnSearch = document.querySelector(".btn-search");
const $AllMobs = document.querySelector(".mob-found");
const $Not = document.querySelector(".notFound");

$btnSearch.addEventListener("click", (e) => {
	e.preventDefault();

	$Not.remove();

	$AllMobs.textContent = createCard();

	console.log($AllMobs);
});

async function loadAllMobs() {
	const response = await fetch("http://10.69.4.208:3000/v1/entities");
	const data = await response.json();
	console.log(data);
}

function createCard() {
	const $div = document.createElement("div");
	const $div2 = document.createElement("div");
	const $div3 = document.createElement("div");
	const $Name = document.createElement("h2");
	const $class = document.createElement("a");
	const $type = document.createElement("p");
	const $line = document.createElement("img");
	const $SeeMore = document.createElement("button");

	// $div2.classList.add("");

	$Name.textContent = loadAllMobs.name;

	$AllMobs.appendChild($div);
	$div.appendChild($div2);
	$div2.appendChild($Name);

	return $AllMobs;
}

// function toggleTheme() {
// 	document.body.classList.toggle("dark");
// 	const toggle = document.querySelector(".theme-toggle");
// 	toggle.textContent = document.body.classList.contains("dark")
// 		? "☀️ Light"
// 		: "🌙 Dark";
// }

// toggleTheme();
