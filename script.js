const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const idNum = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");


const hpElement = document.getElementById("hp");
const attackElement = document.getElementById("attack");
const defenseElement = document.getElementById("defense");
const specialAttackElement = document.getElementById("special-attack");
const specialDefenseElement = document.getElementById("special-defense");
const speedElement = document.getElementById("speed");

// Example of updating the content of these elements

searchBtn.addEventListener("click", async () => {
    pokemonName.textContent = '';
    idNum.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    types.textContent = '';
    hpElement.textContent ='';
    attackElement.textContent ='';
    defenseElement.textContent ='';
    specialAttackElement.textContent ='';
    specialDefenseElement.textContent ='';
    speedElement.textContent ='';
    document.getElementById("sprite").src = '';        
  const searchTerm = searchInput.value.toLowerCase();
  console.log(searchTerm);

  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Display results in the UI
        pokemonName.textContent = data.name.toUpperCase();
        idNum.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        if (searchBtn && (data.id === 94 || data.id === 25)) {
          document.getElementById(
            "sprite"
          ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
        } else {
          document.getElementById(
            "sprite"
          ).src = `${data.sprites.front_default}`;
        }
        types.innerHTML = data.types
        .map(obj => `<span class="types ${obj.type.name}">${obj.type.name}</span>`)
        .join('');
          
        hpElement.textContent = data.stats[0].base_stat;
        attackElement.textContent = data.stats[1].base_stat;
        defenseElement.textContent = data.stats[2].base_stat;
        specialAttackElement.textContent = data.stats[3].base_stat;
        specialDefenseElement.textContent = data.stats[4].base_stat;
        speedElement.textContent = data.stats[5].base_stat;
      });
  } catch (err) {
    console.error(err);
    alert("Pokémon not found");
  }
});
