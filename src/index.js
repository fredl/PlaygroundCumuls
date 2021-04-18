import "./styles.css";
// Données initiales
const items = [
  {
    quantite: 4,
    prixUnitHT: 10.33,
    currency: "EUR",
    tva: 0,
    designation: "prestation"
  },
  {
    quantite: 4,
    prixUnitHT: 32.2,
    currency: "USD",
    tva: 0,
    designation: "prestation 2"
  },
  {
    quantite: 10,
    prixUnitHT: 13.18,
    currency: "EUR",
    tva: 20,
    designation: "prestation 3"
  }
];

let taxes = {};
let taxesResultat = []
// pass a function to map
const lignes = items.map((x) => {
  // création de la clef pour la tva et la devise
  const clef = `${x.currency}-${x.tva}`;
  // a-t-on une ligne dans le dictionnaire destination ?
  if (!Object.prototype.hasOwnProperty(clef))
    taxes[clef] = { taux: x.tva, currency: x.currency, amount: 0.0 };
  // Calcul du total pour la ligne
  const amountHT = parseFloat(x.quantite * x.prixUnitHT);
  // Calcul du montant de tva pour la ligne
  const tvaAmount = (amountHT * parseFloat(x.tva)) / 100.0;
  // Cumul de la tva décaissée dans le dictionnaire
  taxes[clef].amount += tvaAmount;
  // on retourne une ibnstance enrichi
  return { ...x, amountHT, tvaAmount };
});

// Suppression des entrées nulles
Object.entries(taxes).forEach(([k, v]) => {
  console.log(k);
  console.log(v.amount)
  if (v.amount > 0) taxesResultat.push(v)
});
// Mise en page sommaire
const detail = lignes
  .sort((a, b) => a.currency > b.currency)
  .map((x) => {
    return `<li>${x.designation} = ${x.amountHT} ${x.currency}</li>`;
  });
// Mose en page sommaire
const totaux = taxesResultat.map((x) => {
  return `<li>${x.currency} (${x.taux}%) : ${x.amount}</li>`
})
// Forge du résultat
const text = `
<h1>Pure Vanilla!</h1>
<div>
  Calcul simple de cumuls avec rupture
  <h2>total par ligne :</h2>
  <ul>${detail.join("")}</ul>
  <h2>total cumulé</h2>
  <ul>${totaux.join("")}</ul>
</div>
`;

document.getElementById("app").innerHTML = text;
