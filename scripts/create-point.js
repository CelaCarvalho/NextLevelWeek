function populateUFs () {

    const ufSelect = document .querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {

        for (const state of states) {
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
        
    })

}
populateUFs ()

function getCities(event) {
    const citySelect = document .querySelector("select[name=city]")
    const stateInput = document .querySelector("input[name=state]")
    
    const ufValue = event.target.value

    const indexIfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexIfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML  = "<option>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {

       
        for (const city of cities) {
            citySelect.innerHTML +=  `<option value ="${city.name}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)


//Itens de coleta//

//Pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] //let é uma variável e const é uma constante

function handleSelectedItem (event) {
    
    const itemLi = event.target
    //adcionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")


    const itemId = itemLi.dataset.id

  
    
    //Verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //Isso será true ou false//Dois iguais é para comparar valor//
        return itemFound
    }) 

    //Se jpa estiver selecinado, 

    if (alreadySelected>=0 ) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item=>{
            const itemIsDifferent = item != itemId //!= significa diferente//
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {

        //Se não estiver selecionado, 
        
        selectedItems.push(itemId)
        
        //adcionar à seleção
    }

    
    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
  
}