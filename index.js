const pokemonList = document.querySelector("#pokemonList")

let pokemons = []

const fetchPokemons = async () => {
    const response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    const data = await response.json()
    console.log(data)
}

fetchPokemons()