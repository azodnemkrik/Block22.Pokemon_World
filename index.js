const allPokeDiv = document.querySelector("#allPoke")
const singlePokeDiv = document.querySelector("#singlePoke")

let pokemons = []

window.addEventListener("hashchange", (event) => {
    render()
})

const render = async () => {
    const html = pokemons.map((poke)=>{
        // console.log(poke.name, poke.url)
        return `<a href=#${poke.name}>${poke.name}</a>`
    })

    const name = window.location.hash.slice(1)
    console.log(name)

    const singlePoke = pokemons.find((poke) => {
        return poke.name === name
    })
    console.log(singlePoke)

// If I found a single pokemon empty the allPokeDiv
// else show me the list of Pokemon

    allPokeDiv.innerHTML = singlePoke ? fetchSinglePokemon(singlePoke) : html.join("")


}

const fetchAllPokemons = async () => {
    try {
        const response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=251&offset=0")
        const data = await response.json()
        pokemons = data.results
        console.log(data.results)
        return data.results
    } catch (error) {
        
    }
}

const fetchSinglePokemon = async (singlePoke) => {
        const pokeData = await fetch(singlePoke.url)
        const singlePokeData = await pokeData.json()
        console.log(singlePokeData)


        const abilities = singlePokeData.abilities.map((ability) => {
            // console.log(`<p>${ability.ability.name}</p>`)
            return `<p>${ability.ability.name}</p>`

        })

        singlePokeDiv.innerHTML = `
            <h2>Selected Pokemon</h2>
            <h2>${singlePokeData.name}</h2>
            <img src=${singlePokeData.sprites.front_default} />
            <h2>Abilities:</h2> 
        `+ abilities.join("") + `
        <p>Generation: ${singlePokeData.id*1 <= 151 ? "1" : "2"}</p>
         <a href="#">Back to all Pokemon</a>
        `
    // } else {
    //     singlePokeDiv.innerHTML = ""
    // }
}

const init = async () => {
    const pokeData = await fetchAllPokemons()
    console.log(pokeData)
    pokemons = pokeData
    render()
}

init()