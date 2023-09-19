const pokemonList = document.getElementById('pokemonList')
const myModal = document.getElementById('myModal')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `

    <li class="pokemon ${pokemon.type}" onClick="openDetails(${pokemon.number})">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
                ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
            />
          </div>
        </li>

    `
}

function convertToModalDetail(pokemon) {
    return `
    <!-- Modal content -->
    <div class="modal-content">
        
        <div class="pokemon-selected">
            <div class="pokemon-selected-box">
                <div class="pokemon-selected-top ${pokemon.type}">
                    <div class="pokemon-controls">
                        <div class="pokemon-back">
                            <i class="fa-sharp fa-solid fa-arrow-left close" style="color: #ffffff;" title="Back"></i>
                        </div>
                        <div class="pokemon-favorite">
                            <i class="fa-sharp fa-regular fa-heart" style="color: #ffffff;" class="Favorite it!"></i>
                        </div>
                    </div>
    
                    <div class="pokemon-info">
                        <div class="pokemon-name-box">
                            <span class="pokemon-name">Bulbasaur</span>
                            <ol class="pokemon-types">
                                ${pokemon.types.map(type => `<li class="pokemon-type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
                        <div class="pokemon-number">
                            #${pokemon.number}
                        </div>
                    </div>
    
                    <div class="pokemon-image">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </div>
                <div class="pokemon-bottom">
                    
                    <!-- Tab links -->
                    <div class="tab">
                        <button class="tablinks active" onclick="openCity(event, 'about')">About</button>
                        <button class="tablinks" onclick="openCity(event, 'baseStats')">Base Stats</button>
                        <button class="tablinks" onclick="openCity(event, 'evolution')">Evolution</button>
                        <button class="tablinks" onclick="openCity(event, 'moves')">Moves</button>
                    </div>
                    
                    <!-- Tab content -->
                    <div id="about" class="tabcontent" style="display:block;">
    
                        <table border="0">
                            <tr>
                                <th width="80">Species</th>
                                <td>Seed</td>
                            </tr>
                            <tr>
                                <th>Height</th>
                                <td>2'3,6* (0,70cm)</td>
                            </tr>
                            <tr>
                                <th>Weight</th>
                                <td>15.2 lbs (6.9 kg)</td>
                            </tr>
                            <tr>
                                <th>Abilities</th>
                                <td>Overgrow, Chlorophyl</td>
                            </tr>
                        </table>
    
                        <h2>Breeding</h2>
    
                        <table border="0">
                            <tr>
                                <th width="80">Gender</th>
                                <td>87.5%   12.5%</td>
                            </tr>
                            <tr>
                                <th>Egg Groups</th>
                                <td>Monster</td>
                            </tr>
                            <tr>
                                <th>Egg Cycle</th>
                                <td>Grass</td>
                            </tr>
                        </table>
    
                    </div>
                    
                    <div id="baseStats" class="tabcontent">
                        
                    </div>
                    
                    <div id="evolution" class="tabcontent">
                        
                    </div>
                    
                    <div id="moves" class="tabcontent">
                        
                    </div>
    
                </div>
            </div>        
        </div>

    </div>

    
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });

}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }

});

function openDetails(pokemon) {

    pokeApi.getModalDetail(pokemon).then((pokemons) => {
        //const newHtml = convertToModalDetail();
        const newHtml = pokemons.map(convertToModalDetail).join('');
        myModal.innerHTML = newHtml;
    });    

    modal.style.display = "block";

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click',() => {
        modal.style.display = "none";
    })
}