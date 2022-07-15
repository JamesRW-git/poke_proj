getPokemon(1);
searchPokemon();

function searchPokemon() {
    $('#search-by-name-btn').on("click", function() {
        let pokemon = $('#search-by-name').val().toLowerCase();
        getPokemon(pokemon);
        $('#search-by-name').val('');
    })
}

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
    console.log(dataBody);
    return {
        pokemonName: dataBody.name,
        pokemonWeight: (dataBody.weight / 4.536).toFixed(2),
        pokemonHeight: (dataBody.height / 3.048).toFixed(2),
        pokemonTypes: dataBody.types,
        pokemonSprite: dataBody.sprites.front_default
    }
}

function getPokemonTypes(pokemon) {
    let html = `<p class="ms-1">`;
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
        <div class="d-flex justify-content-center">
            <img src="${pokemon.pokemonSprite}" alt="${capitalizeWord(pokemon.pokemonName)}" style="height: 30vh">
        </div>
        <h3>Name: ${capitalizeWord(pokemon.pokemonName)}</h3>
        <div class="d-flex">
            <p>Type: ${getPokemonTypes(pokemon)}</p>
        </div>
        <p>Height: ${pokemon.pokemonHeight} ft</p>
        <p>Weight: ${pokemon.pokemonWeight} lbs</p>
    `)
}

function capitalizeWord(string) {
    return string[0].toUpperCase() + string.substring(1);
}

