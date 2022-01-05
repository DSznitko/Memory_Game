const cardsColor = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];
const popup = document.querySelector(".alert");
const message = document.querySelector(".alert p");
const resetBtn = document.querySelector("button");

let cards = document.querySelectorAll("div");
cards = [...cards];

const starTime = new Date().getTime();
let activeCard = "";
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;


const clickCard = (e) => {
activeCard = e.target;
if(activeCard == activeCards[0]) return;
activeCard.classList.remove("hidden");
if (activeCards.length === 0) {
  activeCards[0] = activeCard;
  return
 } 
 else  cards.forEach(card => {
   card.removeEventListener("click", clickCard)
   activeCards[1] = activeCard;
 });
 
 setTimeout(() => {
  
   if(activeCards[0].className === activeCards[1].className) {
activeCards.forEach(card => {
  card.classList.add("off");
  cards = cards.filter(card => !card.classList.contains("off"));

})
gameResult++;
if (gameResult === gamePairs) {
  const actuallyTime = new Date().getTime();
  const yourTime = (actuallyTime - starTime) / 1000;
  popup.classList.add("active");
  message.textContent = `Congratulations!! Your time is ${yourTime.toFixed(1)}seconds`;
  
  
}
   } else if (activeCards[0].className !== activeCards[1].className) {
     activeCards.forEach(card => {
       card.classList.add("hidden")
     })
    
     
   }
   activeCard = "";
   activeCards.length = 0;
   cards.forEach(card => card.addEventListener("click", clickCard));
   

 },1300)
 
 

 }


const init = () => {
  cards.forEach(card => {
    const position = Math.floor(Math.random() * cardsColor.length);
    card.classList.add(cardsColor[position]);
    cardsColor.splice(position, 1);
  })
  setTimeout(() =>{
cards.forEach(card => {
  card.classList.add("hidden");
  card.addEventListener("click", clickCard)
})
  },2000 )
}

const reset = () => {
  location.reload()
}

resetBtn.addEventListener("click", reset)
init()

