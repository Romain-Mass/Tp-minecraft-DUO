const $btnSearch = document.querySelector(".btn-search");
const $AllMobs = document.querySelector(".mob-found");
const $Not = document.querySelector(".notFound");
const $menu = document.querySelector("#menu");
const $exit = document.querySelector("#exit");
const $dialog = document.querySelector("#dialog");
const $SearchBar = document.querySelector(".bar-search");
const $Class = document.querySelector("#Classification");
const $Type = document.querySelector("#Type");
const $health = document.querySelector(".health");
const $armor = document.querySelector(".armor");
const $damage = document.querySelector(".damage");

function filtrerÉléments(arr, requête) {
	return arr.filter((el) => el.toLowerCase().includes(requête.toLowerCase()));
}

$menu.addEventListener("click", () => {
	$dialog.showModal();
});

$exit.addEventListener("click", () => {
	$dialog.close();
});

$btnSearch.addEventListener("click", async (e) => {
	e.preventDefault();

	$AllMobs.innerHTML = "";

	const mobs = await loadAllMobs();

	if (!mobs || mobs.length === 0) {
		$AllMobs.innerHTML = `
            <div class="notFound">
                <h3>No entity found</h3>
                <img src="ASSETS-mine/emoticon-dead.svg" alt="">
            </div>`;
		return;
	}

	// for(let i = 0; i > mob.length; i++) {
	// 	createCard();
	// }
	mobs.forEach((mob) => createCard(mob));

	// filtrerÉléments();

	console.log($SearchBar.value);
	console.log($Class.value);
	console.log($Type.value);
	console.log($health.value);
	console.log($armor.value);
	console.log($damage.value);
});

async function loadAllMobs() {
	try {
		const response = await fetch("http://10.69.4.208:3000/v1/entities", {
			method: "GET",
		});

		// if (!response.ok) throw new Error(Erreur HTTP : ${response.status});

		const data = await response.json();
		console.log(data);
		return data;
	} catch (err) {
		console.error("Erreur lors du chargement des entités :", err);
		return [];
	}
}


function createCard(mob) {
	const $div = document.createElement("div");
	const $div2 = document.createElement("div");
	const $div3 = document.createElement("div");
	const $Name = document.createElement("h2");
	const $class = document.createElement("a");
	const $type = document.createElement("p");
	const $img = document.createElement("img");
	const $SeeMore = document.createElement("button");

	$Name.textContent = mob.name;
	$img.src = mob.image;
	$img.alt = mob.name;
	$img.classList.add("cardMobImg");
	$class.textContent = mob.classification;
	$type.textContent = mob.type;
	$SeeMore.textContent = "see more";

	$div.classList.add("cardMob");
	$div2.classList.add("card-mob-name");
	$class.classList.add("classifs");

	if (mob.type == "passive") {
		$div.classList.add("cardMobPassive");
		$div.classList.remove("cardMobNeutre");
		$div.classList.remove("cardMobHostile");
	} else if (mob.type == "neutral") {
		$div.classList.add("cardMobNeutre");
		$div.classList.remove("cardMobPassive");
		$div.classList.remove("cardMobHostile");
	} else {
		$div.classList.add("cardMobHostile");
		$div.classList.remove("cardMobNeutre");
		$div.classList.remove("cardMobPassive");
	}

	if (mob.type == "passive") {
		$Name.classList.add("cardMobNamePassive");
		$Name.classList.remove("cardMobNameNeutre");
		$Name.classList.remove("cardMobNameHostile");
	} else if (mob.type == "neutral") {
		$Name.classList.add("cardMobNameNeutre");
		$Name.classList.remove("cardMobNamePassive");
		$Name.classList.remove("cardMobNameHostile");
	} else {
		$Name.classList.add("cardMobNameHostile");
		$Name.classList.remove("cardMobNameNeutre");
		$Name.classList.remove("cardMobNamePassive");
	}

	if (mob.type == "passive") {
		$SeeMore.classList.add("buttonSeeMorePassive");
		$SeeMore.classList.remove("buttonSeeMoreNeutre");
		$SeeMore.classList.remove("buttonSeeMoreHostile");
	} else if (mob.type == "neutral") {
		$SeeMore.classList.add("buttonSeeMoreNeutre");
		$SeeMore.classList.remove("buttonSeeMorePassive");
		$SeeMore.classList.remove("buttonSeeMoreHostile");
	} else {
		$SeeMore.classList.add("buttonSeeMoreHostile");
		$SeeMore.classList.remove("buttonSeeMoreNeutre");
		$SeeMore.classList.remove("buttonSeeMorePassive");
	}

	if (mob.type == "passive") {
		$div3.classList.add("cardMobClassification");
		$div3.classList.add("cardMobLinePassive");
		$div3.classList.remove("cardMobLineNeutre");
		$div3.classList.remove("cardMobLineHostile");
	} else if (mob.type == "neutral") {
		$div3.classList.add("cardMobClassification");
		$div3.classList.add("cardMobLineNeutre");
		$div3.classList.remove("cardMobLinePassive");
		$div3.classList.remove("cardMobLineHostile");
	} else {
		$div3.classList.add("cardMobClassification");
		$div3.classList.add("cardMobLineHostile");
		$div3.classList.remove("cardMobLineNeutre");
		$div3.classList.remove("cardMobLinePassive");
	}

	$div.appendChild($div2);
	$div2.appendChild($Name);
	$div2.appendChild($img);
	$div.appendChild($div3);
	$div3.appendChild($class);
	$div3.appendChild($type);
	$div.appendChild($SeeMore);

	$AllMobs.appendChild($div);
}

$SearchBar.addEventListener("input", () => {
	const query = $SearchBar.value.toLowerCase().trim();

	const filteredCards = loadAllMobs.filter((card) => {
		return card.name.toLowerCase().includes(query);
	});

	resetcreateCard(mob);
	displayAllCards(filteredCards);
});
