// const $color = document.querySelector("#nigth");
const $btnSearch = document.querySelector(".btn-search");
const $AllMobs = document.querySelector(".mob-found");
const $Not = document.querySelector(".notFound");
const $menu = document.querySelector("#menu");
const $exit = document.querySelector("#exit");
const $dialog = document.querySelector("#dialog");

$menu.addEventListener("click", () => {
	$dialog.showModal();
});

$exit.addEventListener("click", () => {
	$dialog.close();
});

$btnSearch.addEventListener("click", (e) => {
	e.preventDefault();

	$Not.remove();

	$AllMobs.textContent = createCard();

	console.log($AllMobs);
});

async function loadAllMobs() {
	const response = await fetch("http://10.69.4.208:3000/v1/entities", {
		method: "GET",
		body: JSON.stringify(),
	});
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
	$line.src = loadAllMobs.image;
	$SeeMore.textContent = "See More";
	$class.textContent = loadAllMobs.classification;
	$type.textContent = loadAllMobs.type;

	$AllMobs.appendChild($div);
	$div.appendChild($div2);
	$div2.appendChild($Name);
	$div2.appendChild($line);
	$div.appendChild($div3);
	$div3.appendChild($class);
	$div3.appendChild($type);
	$div.appendChild($SeeMore);

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
