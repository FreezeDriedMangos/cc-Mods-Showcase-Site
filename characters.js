const NUM_COLUMNS = 4

const tsvBecauseJSCantReadLocalFilesLAME = 
`Dizzy	2	5	1	1	0	1	1	TRUE	TRUE	Cobalt Core	Cobalt Core
Riggs	2	1	5	3	0	1	1	TRUE	TRUE	Cobalt Core	Cobalt Core
Peri	5	1	3	2	0	1	1	TRUE	TRUE	Cobalt Core	Cobalt Core
Isaac	2	3	1	2	5	1	3	TRUE	TRUE	Cobalt Core	Cobalt Core
Drake	5	3	2	2	0	4	3	TRUE	TRUE	Cobalt Core	Cobalt Core
Max	1	3	2	5	0	2	4	TRUE	TRUE	Cobalt Core	Cobalt Core
Books	3	3	2	3	2	2	3	TRUE	FALSE	Cobalt Core	Cobalt Core
Cat	2?3	1?4	1?4	1?4	0?5	3	4	TRUE	FALSE	Cobalt Core	Cobalt Core
Johanna	4	2	3	2	5	2	4	FALSE	FALSE	Johanna the Trucker	Arin and EWanderer
Riggs?	4	1	3	2	3	2	3	FALSE	FALSE	Evil Riggs	
Philip	3	1	1	4	1	3	5	TRUE	FALSE	Philip the Mechanic	clay
Sir Ratzo	3	1	1	2	1	3	5	FALSE	FALSE	Knight's Cohort	clay
Dame Emily	2	1	3	3	5	2	4	FALSE	FALSE	Knight's Cohort	clay
Dame Halla	1?2	1	1	3?2	0	5	5	FALSE	FALSE	Knight's Cohort	clay
Lady Ruby	0	0	0	0	0	0	0	FALSE	FALSE	Knight's Cohort	clay
Nola	1	2	2	6	0	2	4	TRUE	TRUE	Two's Company	Mezzelo
Isabelle	5	0	4	1	0	3	3	TRUE	TRUE	Two's Company	Mezzelo
Ilya	5	2	1	3	0	5	4	TRUE	FALSE	Two's Company	Mezzelo
Dave	5	2	2	2	0	3	4	FALSE	FALSE	Dave the Gambler	rft50
Jester	0	0	0	0	0	0	0	FALSE	FALSE		rft50
Dizzy?	6	1	1	2	1	5	3	TRUE	FALSE	Corrosive Cobra	
Len	3	2	2	2	2	3	4	FALSE	FALSE	Len Mod	
Soggins	4	2	2	4	3	4	3	TRUE	FALSE	Soggins	Arin & Shockah
Dracula	4	3	2	4	2	3	3	FALSE	FALSE	Dracula	Shockah
Tucker	6	4	0	1	0	3	2	FALSE	FALSE	Tucker the Saboteur	SoggoruWaffle
Eili	2	3	0	4	1	1	1	FALSE	FALSE	Braid and Eili Avali Duo	
Braid	5	1	1	2	1	3	2	FALSE	FALSE	Braid and Eili Avali Duo	
Eddie	3	2	1	5	1	1	3	FALSE	FALSE	Eddie the Electrian	
Randall	2?1	2?1	2?1	2	0	1	3	FALSE	FALSE	Randall the Playtester	
Tera	0	0	0	0	0	0	0	FALSE	FALSE		Teratto`

function makeGrid(container, rows, cols, contentFunction) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (i = 0; i < (rows * cols); i++) {
    let cell = document.createElement("div");
    contentFunction(cell, i, Math.trunc(i/cols), i%cols)
    container.appendChild(cell).className = "grid-item";
  };
};

let sortOption = "default"
document.getElementById(sortOption).style.backgroundColor = "#3a67cc"

const charactersRaw = tsvBecauseJSCantReadLocalFilesLAME.split('\n')
const characters = charactersRaw.map((raw, index) => {
    const data = raw.split('\t')
    return {
        name:       data[0],
        offense:    (data[1]+"?0").split('?').map(n => JSON.parse(n)),
        defense:    (data[2]+"?0").split('?').map(n => JSON.parse(n)),
        evasion:    (data[3]+"?0").split('?').map(n => JSON.parse(n)),
        utility:    (data[4]+"?0").split('?').map(n => JSON.parse(n)),
        midrow:     (data[5]+"?0").split('?').map(n => JSON.parse(n)),
        risk:       (data[6]+"?0").split('?').map(n => JSON.parse(n)),
        difficulty: (data[7]+"?0").split('?').map(n => JSON.parse(n)),
        dialogue: JSON.parse(data[8].toLowerCase()),
        memories: JSON.parse(data[9].toLowerCase()),
        mod: data[10],
        author: data[11],
        index 
    }
});

const charactersCount = charactersRaw.length
const characterBlockTemplate = document.getElementById("characterBlock")
characterBlockTemplate.remove()

const container = document.getElementById("characterBlocks")
makeCharacterBlocks()

function makeCharacterBlocks() {
    for (let i = 0; i < characters.length; i++) {
        // let cell = document.createElement("div")
        // container.appendChild(cell).className = "grid-item"
    
        // cell.innerText = characters[i].name
        const block = characterBlockTemplate.cloneNode(true)
        block.querySelector("#profilePic").src = `characterArt/CharPortraits${characters[i].index+1}.png`
        for (let j = 0; j < characters[i].offense[0];    j++) block.querySelector(`#offense${j+1}`    ).style.backgroundColor = "#c651f6";
        for (let j = 0; j < characters[i].defense[0];    j++) block.querySelector(`#defense${j+1}`    ).style.backgroundColor = "#44a5fc";
        for (let j = 0; j < characters[i].evasion[0];    j++) block.querySelector(`#evasion${j+1}`    ).style.backgroundColor = "#ff9d77";
        for (let j = 0; j < characters[i].utility[0];    j++) block.querySelector(`#utility${j+1}`    ).style.backgroundColor = "#6f72e5";
        for (let j = 0; j < characters[i].midrow[0];     j++) block.querySelector(`#midrow${j+1}`     ).style.backgroundColor = "#5df7a1";
        for (let j = 0; j < characters[i].risk[0];       j++) block.querySelector(`#risk${j+1}`       ).style.backgroundColor = "#f35281";
        for (let j = 0; j < characters[i].difficulty[0]; j++) block.querySelector(`#difficulty${j+1}` ).style.backgroundColor = "#d4e8f4";
        
        for (let j = characters[i].offense[0];    j < characters[i].offense[1];    j++) block.querySelector(`#offense${j+1}`    ).innerText = "?"; 
        for (let j = characters[i].defense[0];    j < characters[i].defense[1];    j++) block.querySelector(`#defense${j+1}`    ).innerText = "?"; 
        for (let j = characters[i].evasion[0];    j < characters[i].evasion[1];    j++) block.querySelector(`#evasion${j+1}`    ).innerText = "?"; 
        for (let j = characters[i].utility[0];    j < characters[i].utility[1];    j++) block.querySelector(`#utility${j+1}`    ).innerText = "?"; 
        for (let j = characters[i].midrow[0];     j < characters[i].midrow[1];     j++) block.querySelector(`#midrow${j+1}`     ).innerText = "?"; 
        for (let j = characters[i].risk[0];       j < characters[i].risk[1];       j++) block.querySelector(`#risk${j+1}`       ).innerText = "?"; 
        for (let j = characters[i].difficulty[0]; j < characters[i].difficulty[1]; j++) block.querySelector(`#difficulty${j+1}` ).innerText = "?"; 
        
        if (!characters[i].memories) block.querySelector("#memoriesIcon").style.visibility = "hidden";
        if (!characters[i].dialogue) block.querySelector("#dialogueIcon").style.visibility = "hidden";
        block.querySelector("#modnameLabel").innerText = characters[i].mod + "\n" + characters[i].author
        // const modname = document.createElement("span")
        // modname.innerText = characters[i].mod
        // block.querySelector(".div2").appendChild(modname) 
        
        container.appendChild(block)
    }
}



function reSortCharacters() {
    // tq helps me make sure that [][]? will consistently sort higher/lower than [][]
    const tq = (x) => x > 0 ? 0.1 : 0

    const sortParams = sortOption.split(":")
    characters.sort((c1, c2) => {
        if (sortOption === "default") {
            return c1.index - c2.index
        } else {
            const paramC1 = c1[sortParams[0]];
            const paramC2 = c2[sortParams[0]]; 

            if (sortParams[1] == "ASC") return (paramC1[0]+tq(paramC1[1])) - (paramC2[0]+tq(paramC2[1])); 
            if (sortParams[1] == "DSC") return (paramC2[0]+paramC2[1]-tq(paramC2[1])) - (paramC1[0]+paramC1[1]-tq(paramC1[1]));
        }

        return 0;
    })
}

function sortButtonClicked(event) {
    console.log(sortOption)
    const buttons = document.getElementsByClassName("sortButton");
    sortOption = event.target.id
    for (let i = 0; i < buttons.length; i++) buttons[i].style.backgroundColor = "#060326"
    try { document.getElementById(sortOption).style.backgroundColor = "#3a67cc" } catch {}

    container.innerHTML = '';
    reSortCharacters()
    makeCharacterBlocks()

}