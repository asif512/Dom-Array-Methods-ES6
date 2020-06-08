const addUser = document.getElementById('addUsers');
const doubleMoney = document.getElementById('doubleMoney');
const millioners = document.getElementById('millioners');
const richest = document.getElementById('richest');
const totalWealth = document.getElementById('totalWealth');
const details = document.querySelector('.details');

let users = []
getRandomUsers();

// GET RANDOM USERS
async function getRandomUsers() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    const user = data.results[0];

    const newUsers = {
        name: `${user.name.first} ${user.name.last}`,
        thumbnail: `${user.picture.thumbnail}`,
        wealth: Math.floor(Math.random() * 1000000)
    }
    
    addUsers(newUsers);
}



// ADD USERS
function addUsers(user) {  
    users.push(user)
    updateDom();
}


// RENDER USERS ON DOM
function updateDom() {
    details.innerHTML =  `
        <div class="titles">
            <h2 class='avatar'>Avatar</h2> 
            <h2 class='name'>Name</h2> 
            <h2 class='wealth'>Wealth</h2>   
        </div>
        <hr>
    `;
    users.forEach(user => {
        const div = document.createElement('div');
        div.classList.add('body');
        div.innerHTML = `
                <p class='avatar'> <img src=${user.thumbnail} alt="avatar"> </p>
                <p class='name ml-3'>${user.name}</p>
                <p class='wealth'>$${user.wealth}</p>
        `;
        details.appendChild(div);
    });
    
}
updateDom();

// DOUBLE MONEY
function doubleAmount() {
    users = users.map(user => {
        return {thumbnail: user.thumbnail, name:user.name, wealth: user.wealth * 2}
    });

    // console.log(users);
    updateDom();
}

// FILTER ONLY MILLIONERS
function showMillioners() {
    users = users.filter(user => user.wealth > 1000000);
    updateDom();
}

// SORT RICHEST
function showRichest(){
    users.sort((a, b) => b.wealth - a.wealth)
    updateDom();
}

// CALCULATE TOTAL AMOUNT
function totalAmount() {
    const totalAmount = users.reduce((acc, no) => (acc += no.wealth), 0)
    const div = document.createElement('div');
    div.innerHTML = `
        <div class='total alert alert-secondary'>
            <h2>Total Amount </h2>
            <p>$${totalAmount}</p>
        </div>
    `;
    details.appendChild(div);

}

// Event Listner
addUser.addEventListener('click', getRandomUsers);
doubleMoney.addEventListener('click', doubleAmount)
millioners.addEventListener('click', showMillioners);
richest.addEventListener('click', showRichest);
totalWealth.addEventListener('click', totalAmount)
