// Define the API endpoint
const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon/';

// Function to fetch Pokémon data
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`${pokemonAPI}${pokemonName}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Function to render Pokémon cards
async function renderPokemonCards() {
    const pokemonNames = ['bulbasaur', 'charmander', 'squirtle', 'pikachu', 'jigglypuff', 'eevee', 'snorlax']; 
    const pokemonCardsContainer = document.getElementById('pokemon-cards');

    pokemonNames.forEach(async (pokemonName) => {
        const pokemonData = await fetchPokemonData(pokemonName);
        const card = `
            <div class="pokemon-card">
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <h2>${pokemonData.name}</h2>
                <p class="height">Height: ${pokemonData.height}</p>
                <p class="weight">Weight: ${pokemonData.weight}</p>
            </div>
        `;
        pokemonCardsContainer.innerHTML += card;
    });
}

// Function to filter Pokémon cards based on search input
function filterPokemonCards() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon-card');

    pokemonCards.forEach((card) => {
        const pokemonName = card.querySelector('h2').textContent.toLowerCase();
        if (pokemonName.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to sort Pokémon cards
function sortPokemonCards() {
    const sortSelect = document.getElementById('sort-select');
    const pokemonCardsContainer = document.getElementById('pokemon-cards');
    const pokemonCards = Array.from(pokemonCardsContainer.getElementsByClassName('pokemon-card'));

    pokemonCards.sort((a, b) => {
        const aValue = a.querySelector(`.${sortSelect.value}`).textContent.toLowerCase();
        const bValue = b.querySelector(`.${sortSelect.value}`).textContent.toLowerCase();
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
    });

    // Clear the container before appending sorted cards
    pokemonCardsContainer.innerHTML = '';

    // Append sorted cards to the container
    pokemonCards.forEach((card) => pokemonCardsContainer.appendChild(card));
}

// Invoke the function to render Pokémon cards
renderPokemonCards();

// Add event listener for search input
document.getElementById('search-input').addEventListener('keyup', filterPokemonCards);

// Add event listener for sort select
document.getElementById('sort-select').addEventListener('change', sortPokemonCards);
