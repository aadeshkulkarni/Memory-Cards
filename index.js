const cardsContainer=document.getElementById('cards-container');
const prevBtn=document.getElementById('prev');
const nextBtn=document.getElementById('next');
const currentEl=document.getElementById('current');
const showBtn=document.getElementById('show');
const hideBtn=document.getElementById('hide');
const questionEl=document.getElementById('question');
const answerEl=document.getElementById('answer');
const addCardBtn=document.getElementById('add-card');
const clearBtn=document.getElementById('clear');
const addContainer=document.getElementById('add-container');

// Keep track of current card
let currentActiveCard=0;

// Store DOM cards
const cardsEl=[];

// Store card data

const cardsData=getCardsData();

// const cardsData=[
//     {
//         question:'Question 1?',
//         answer:"Answer 1"
//     },
//     {
//         question:'Question 2?',
//         answer:"Answer 2"
//     }
// ];


// Create all cards
function createCards(){
    cardsData.forEach(function(data,index){
        createCard(data,index);
    });
}

// Create a single card in the DOM
function createCard(data,index){
    const card=document.createElement("div");
    card.classList.add("card");

    if(index===0){
        card.classList.add("active");
    }

    card.innerHTML=`
        <div class="inner-card">
        <div class="inner-card-front">
            <p>
                ${data.question}
            </p>
        </div>
        <div class="inner-card-back">
            <p>
            ${data.answer}
            </p>
        </div>
        </div>
    `;
    card.addEventListener('click',function(){
        card.classList.toggle('show-answer');
    })
    // Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

//show Number of cards
function updateCurrentText(){
    currentEl.innerText=`${currentActiveCard+1}/${cardsEl.length}`;
}

// get cards from localStorage
function getCardsData(){
    const cards=JSON.parse(localStorage.getItem('cards'));
    return cards===null?[]:cards;
}

// add cards to localStorage
function setCardsData(cards){
    localStorage.setItem('cards',JSON.stringify(cards));
    window.location.reload();
}

createCards();

// Event listeners

nextBtn.addEventListener('click',()=>{
    cardsEl[currentActiveCard].className='card left';

    currentActiveCard=currentActiveCard+1;

    if(currentActiveCard>cardsEl.length-1){
        currentActiveCard=cardsEl.length-1;
    }

    cardsEl[currentActiveCard].className='card active';

    updateCurrentText();
});

prevBtn.addEventListener('click',()=>{
    cardsEl[currentActiveCard].className='card right';

    currentActiveCard=currentActiveCard-1;

    if(currentActiveCard<0){
        currentActiveCard=0;
    }

    cardsEl[currentActiveCard].className='card active';

    updateCurrentText();
});

// show add container
showBtn.addEventListener('click',function(){
    addContainer.classList.add('show');
});

// HIDE add container
hideBtn.addEventListener('click',function(){
    addContainer.classList.remove('show');
});

addCardBtn.addEventListener('click',function(){
    const question=questionEl.value;
    const answer=answerEl.value;

    if(question.trim() && answer.trim() ){
        const newCard={ question,answer};
    
    createCard(newCard);
    questionEl.value="";
    answerEl.value="";

    addContainer.classList.remove("show");

    cardsData.push(newCard);

    setCardsData(cardsData);
    }
});


// Clear cards button
clearBtn.addEventListener('click',function(){
    localStorage.clear();
    cardsContainer.innerHTML="";
    window.location.reload();
});