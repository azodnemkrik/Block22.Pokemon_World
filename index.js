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
    allPokeDiv.innerHTML = html.join("")

    const name = window.location.hash.slice(1)
    console.log(name)

    const singlePoke = pokemons.find((poke) => {
        return poke.name === name
    })
    console.log(singlePoke)

    if(singlePoke){
        const pokeData = await fetch(singlePoke.url)
        const singlePokeData = await pokeData.json()
        console.log(singlePokeData)

        singlePokeDiv.innerHTML = `
            <h2>Selected Pokemon</h2>
            <h2>${singlePokeData.name}</h2>
            <img src=${singlePokeData.sprites.front_default} />
        `

    }
}

const fetchAllPokemons = async () => {
    try {
        const response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
        const data = await response.json()
        pokemons = data.results
        // console.log(pokemons)
        render()
    } catch (error) {
        
    }
}

fetchAllPokemons()