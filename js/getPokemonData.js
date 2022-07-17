let arrayOfMoarPokemon = [];
let moarPokemonHTML = "";
let x = 0;

clearArray();
getPokemon(1);
get20Pokemon();
searchPokemon();

function clearArray() {
    arrayOfMoarPokemon = [];
}

function searchPokemon() {
    $(document).ready(function () {
        $("#search-by-name").keyup(function (event) {
            if (event.which === 13) {
                $("#search-by-name-btn").click();
            }
        });
        $("#submit").click(function () {
            alert('clicked!');
        })
    });

    $('#search-by-name-btn').on("click", function () {
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
        if (i < pokemon.pokemonTypes.length - 1) {
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
        <div class="d-flex justify-content-center m-3" id="main-display">
            <img src="${pokemon.pokemonSprite}" alt="${capitalizeWord(pokemon.pokemonName)}" style="height: 30vh">
        </div>
        <h3 class="text-center">Name: ${capitalizeWord(pokemon.pokemonName)}</h3>
        <div class="d-flex justify-content-center">
            <p>Type: ${getPokemonTypes(pokemon)}</p>
        </div>
        <p class="text-center">Height: ${pokemon.pokemonHeight} ft</p>
        <p class="text-center">Weight: ${pokemon.pokemonWeight} lbs</p>
    `)
}

function get20Pokemon() {
    //change offset to variable for pagination
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
        //no semicolons until the end because we're chaining
        .then(response => response.json())
        //arrow function must have curly braces if you have more than one line of code in the body
        .then(data => {
            // console.log(data.results);
            arrayOfMoarPokemon = [data.results];
            moarPokemonCards(arrayOfMoarPokemon);
        })
        .catch(err => console.error(err));
}

function moarPokemonCards(arrayOfPokemon) {
    arrayOfPokemon = arrayOfPokemon[0];
    // console.log(arrayOfPokemon)
    let idOrName = '';
    for (let i = 0; i < arrayOfPokemon.length; i++) {
        idOrName = arrayOfPokemon[i].name;
        fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
            //no semicolons until the end because we're chaining
            .then(response => response.json())
            //arrow function must have curly braces if you have more than one line of code in the body
            .then(response => getSanitizedData(response))
            .then(data => {
                console.log(data)
                $('#moar-pokemon').html(renderMoarPokemonCards(data));
            })
            .catch(err => console.error(err));
    }
}

function renderMoarPokemonCards(pokemon) {
    moarPokemonHTML += `
        <div data-id="${pokemon.pokemonName}" class="m-2 col-2 pokeCard">
            <div class="d-flex justify-content-center">
                <img src="${pokemon.pokemonSprite}" alt="${pokemon.pokemonName}">
            </div>
            <h4 class="text-center">${capitalizeWord(pokemon.pokemonName)}</h4>
        </div>
    `
    return moarPokemonHTML;
}



function capitalizeWord(string) {
    return string[0].toUpperCase() + string.substring(1);
}

