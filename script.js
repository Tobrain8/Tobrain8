const produktListe = [];

class Produkt{
  constructor(name, price, pfand, background = "lightgreen"){
    this.name = name;
    this.price = price;
    this.pfand = pfand;
    this.amount = 0;
    this.background = background;
  }
}



produktListe.push(new Produkt("Gilde", 3, 1));
produktListe.push(new Produkt("Weizen", 4.5, 2));
produktListe.push(new Produkt("AfG", 2.5, 1));
produktListe.push(new Produkt("Kurze", 2, 0));
produktListe.push(new Produkt("Prosecco", 2.5, 1));
produktListe.push(new Produkt("Mische", 3, 1));
produktListe.push(new Produkt("Glas", 1, 0, "lightgrey"));//{Pfand muss in dieser Reihenfolge an 
produktListe.push(new Produkt("-Pfand", -1, 0, "#ff9428"));//}den letzten 2 pos. des arrays bleiben.

function main(){
  addProduktButtons()
  kassenTabelleErstellen();
}


function addProduktButtons(){
  let div = document.getElementById("productDiv");
  let addBreak = false;
  produktListe.forEach((produkt)=>{
    let button = document.createElement("button");
    button.classList.add("produkte");
    button.innerHTML = produkt.name + " (" + produkt.price + "€)";
    button.onclick = ()=>{addProdukt(produkt)}
    button.style.backgroundColor = produkt.background;
    
    div.appendChild(button);

    if(addBreak){
      let br = document.createElement("br");
      div.appendChild(br);
    }
    addBreak = !addBreak;
  })
}

function addProdukt(produkt){
  produkt.amount++;
  if(document.getElementById("pfandSwitch").checked){
    for(let i = 0; i < produkt.pfand; i++){
      addProdukt(produktListe[produktListe.length-2])
    }
  }
  kassenTabelle.innerHTML = "";
  kassenTabelleErstellen();
  vibrate(70)
}

function getTitelzeile(){
  let titelzeile = document.createElement("tr");
  titelzeile.id = "titelzeile"
  let titel = ["Produkt", "Preis", "Anzahl", "", "Summe"]
  i = 1;
  titel.forEach(e => {
    let th = document.createElement("th");
    if(i==1){
      th.id = "name"
      i++
    }
    th.innerHTML = e;
    th.classList.add("titel")
    titelzeile.appendChild(th);
  })
  return titelzeile
}

function getTotalzeile(total){
  let totalzeile = document.createElement("tr");
  totalzeile.id = "totalzeile"
  let titel = ["Total:", "", "", "", total + "€"]
  titel.forEach(e => {
    let th = document.createElement("th");
    th.innerHTML = e;
    totalzeile.appendChild(th);
  })
  return totalzeile
}

function getProduktzeilen(){
  let produktzeilen = [];
  produktListe.forEach((produkt)=>{
    if(produkt.amount == 0)return;
    let zeile = document.createElement("tr");
    zeile.id = produkt.name;
    let removeButton = document.createElement("button")
    removeButton.id = "decrease"
    removeButton.innerText = "-"
    removeButton.onclick = () => {remove(produkt)}

    let zelleName = document.createElement("td");
    let zellePreis = document.createElement("td");
    let zelleAnzahl = document.createElement("td");
    let zelleDecrease = document.createElement("td");
    let zelleSumme = document.createElement("td");

    zelleName.innerHTML = produkt.name
    zellePreis.innerHTML = produkt.price + "€"
    zelleAnzahl.innerHTML = produkt.amount
    zelleDecrease.appendChild(removeButton)
    zelleSumme.innerHTML = (produkt.amount * produkt.price).toFixed(2) + "€"
    
    zeile.appendChild(zelleName)
    zeile.appendChild(zellePreis)
    zeile.appendChild(zelleAnzahl)
    zeile.appendChild(zelleDecrease)
    zeile.appendChild(zelleSumme)

    produktzeilen.push(zeile)

  })
  return produktzeilen;
}

function kassenTabelleErstellen() {
  let kassenTabelle = document.getElementById("kassenTabelle");
  let total = 0
  kassenTabelle.appendChild(getTitelzeile());

  let produktzeilen = getProduktzeilen();
  produktzeilen.forEach(zeile => {
    total += Number(zeile.lastChild.innerHTML.slice(0, -1))
    kassenTabelle.appendChild(zeile)
  });
  
  kassenTabelle.appendChild(getTotalzeile(total.toFixed(2)));
  
}

function reset(){
  let kassenTabelle = document.getElementById("kassenTabelle");
  produktListe.forEach((produkt)=>{
    produkt.amount = 0;
  })
  kassenTabelle.innerHTML = "";
  kassenTabelleErstellen();
  vibrate(200)
}

function vibrate(ms){
  let vibe = document.getElementById("vibSwitch");
  if(vibe.checked)navigator.vibrate(ms)
}

function remove(produkt){
  produkt.amount -= 1
  kassenTabelle.innerHTML = "";
  kassenTabelleErstellen();
  vibrate(70)
}


window.onload = main()