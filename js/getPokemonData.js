getPokemon(1);

function getPokemon(idOrName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
        //no semicolons until the end because we're chaining
        .then(response => response.json())
        //arrow function must have curly braces if you have more than one line of code in the body
        .then(response => getSanitizedData(response))
        .then(data => renderSinglePokemon(data))
        .catch(err => console.error(err));
}

function getSanitizedData(dataBody) {
    return {
        pokemonName: dataBody.name,
        pokemonWeight: dataBody.weight,
        pokemonHeight: dataBody.height,
        pokemonTypes: dataBody.types
    }
}

function getPokemonTypes(pokemon) {
    let html = `<p>`;
    for (let i = 0; i < pokemon.pokemonTypes.length; i++) {
        if(i < pokemon.pokemonTypes.length - 1) {
            html += `${pokemon.pokemonTypes[i].type.name}, `
        } else {
            html += `${pokemon.pokemonTypes[i].type.name}`
        }
    }
    html += `</p>`
    return html;
}

function renderSinglePokemon(pokemon) {
    //language=HTML
    $('#selected-pokemon').html(`
        <h3>Name: ${pokemon.pokemonName}</h3>
        <p>Type: ${getPokemonTypes(pokemon)}</p>
        <p>Height: ${pokemon.pokemonHeight}</p>
        <p>Weight: ${pokemon.pokemonWeight}</p>
    `)
}

