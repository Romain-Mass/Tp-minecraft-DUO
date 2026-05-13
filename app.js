document.addEventListener("DOMContentLoaded", () => {
	const $btnSearch = document.querySelector(".btn-search");
	const $AllMobs = document.querySelector(".mob-found");
	const $menu = document.querySelector("#menu");
	const $exit = document.querySelector("#exit");
	const $dialog = document.querySelector("#dialog");
	const $SearchBar = document.querySelector(".bar-search");
	const $Class = document.querySelector("#Classification");
	const $Type = document.querySelector("#Type");
	const $health = document.querySelector(".health");
	const $armor = document.querySelector(".armor");
	const $damage = document.querySelector(".damage");

	let allMobs = [];

	if ($menu && $dialog) {
		$menu.addEventListener("click", () => $dialog.showModal());
	}
	if ($exit && $dialog) {
		$exit.addEventListener("click", () => $dialog.close());
	}

	async function loadAllMobs() {
		try {
			const response = await fetch("http://10.69.4.208:3000/v1/entities");
			const data = await response.json();
			return data;
		} catch (err) {
			console.error("Erreur lors du chargement des entités :", err);
			return [];
		}
	}

	function filterMobs(mobs) {
		const query = $SearchBar?.value.toLowerCase().trim() || "";
		const classification = $Class?.value.toLowerCase() || "";
		const type = $Type?.value.toLowerCase() || "";
		const minHealth = parseFloat($health?.value);
		const minArmor = parseFloat($armor?.value);
		const minDamage = parseFloat($damage?.value);

		return mobs.filter((mob) => {
			const matchName = !query || mob.name.toLowerCase().includes(query);
			const matchClass =
				!classification || mob.classification?.toLowerCase() === classification;
			const matchType = !type || mob.type?.toLowerCase() === type;
			const matchHealth = isNaN(minHealth) || mob.health >= minHealth;
			const matchArmor = isNaN(minArmor) || mob.armor >= minArmor;
			const matchDamage = isNaN(minDamage) || mob.damage >= minDamage;

			return (
				matchName &&
				matchClass &&
				matchType &&
				matchHealth &&
				matchArmor &&
				matchDamage
			);
		});
	}

	function displayMobs(mobs) {
		if (!$AllMobs) return;
		$AllMobs.innerHTML = "";

		if (mobs.length === 0) {
			$AllMobs.innerHTML = `
			<div class="notFound">
				<h3>No entity found</h3>
				<img src="ASSETS-mine/emoticon-dead.svg" alt="">
			</div>`;
			return;
		}

		mobs.forEach((mob) => createCard(mob));
	}

	if ($btnSearch) {
		$btnSearch.addEventListener("click", async (e) => {
			e.preventDefault();

			if (allMobs.length === 0) {
				allMobs = await loadAllMobs();
			}

			const filtered = filterMobs(allMobs);
			displayMobs(filtered);
		});
	}

	if ($SearchBar) {
		$SearchBar.addEventListener("input", () => {
			if (allMobs.length === 0) return;
			const filtered = filterMobs(allMobs);
			displayMobs(filtered);
		});
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
		$class.classList.add("classifs");
		$type.textContent = mob.type;
		$SeeMore.textContent = "see more";

		$div.classList.add("cardMob");
		$div2.classList.add("card-mob-name");
		$div3.classList.add("cardMobClassification");

		const t = mob.type?.toLowerCase();
		const typeMap = {
			passive: "Passive",
			neutral: "Neutre",
			hostile: "Hostile",
		};
		const typeKey = typeMap[t] || "Hostile";

		$div.classList.add(`cardMob${typeKey}`);
		$Name.classList.add(`cardMobName${typeKey}`);
		$SeeMore.classList.add(`buttonSeeMore${typeKey}`);
		$div3.classList.add(`cardMobLine${typeKey}`);

		$div.appendChild($div2);
		$div2.appendChild($Name);
		$div2.appendChild($img);
		$div.appendChild($div3);
		$div3.appendChild($class);
		$div3.appendChild($type);
		$div.appendChild($SeeMore);

		if ($AllMobs) $AllMobs.appendChild($div);
	}
});

// const $entity = document.querySelector("");
const $Xcoords = document.querySelector("#X");
const $Ycoords = document.querySelector("#Y");
const $btnSpawn = document.querySelector(".btn-spawn");

$btnSpawn.addEventListener("click", (e) => {
	e.preventDefault();

	console.log($Xcoords.value);
	console.log($Ycoords.value);
});
