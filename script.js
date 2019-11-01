function dq(a) {
    return document.querySelector('.' + a);
}

function dqa(a) {
    return document.querySelectorAll('.' + a);
}
let arr2 = [
    'btc',
    'eur',
    'rub',
    'jpy',
    'gbp'
];

let winArr = [
    'W',
    'I',
    'N'
]

// dq('one').innerHTML = 'dfdfd';

// dqa('result').forEach((item)=>{
//     item.innerHTML = arr[Math.floor(Math.random()*5)];
// })
dq('reff').addEventListener('click', (e) => {
    // e.preventDefault();
    start();

    // console.log(start());
});

let amount = 0;
let result = dqa('result h3');
let casinoBallance = dq('casinoBallance');
let userMoney = dq('ballans');
let interval, firstBid;
let allBalance = 1000000;
let balanseUser = 100;
let resultGame;
let sum = 0;
let bid;
let bidPanel = dqa('bid-panel p')
let bidPanelOne = dq('bid-panel')

// let spinOne = dq('spin.one');
// let spinTwo = dq('spin.two');
// let spinThree = dq('spin.three');
// let spin = dq('spin-main');
// let spinOneTop = spin.getBoundingClientRect();
// let spinI = dqa('spin i');
// let topIndex;

// spin.appendChild(spinI[0]); 
let x = 100;
let y = 100;
// let spinMain = setInterval(() => {


//     x -= 20;
//     if (x == 0) {
//         clearInterval(spinMain);
//     };
//     console.log(x, 'x');
//     ss(x);
//     function ss(x){
//         let spin = setInterval(() => {
//             topIndex += 50;
//             // y-=y;
//             // if (y==0) {
//             //     clearInterval(spin);
//             // };
//             if (topIndex == 1200) {
//                 topIndex = 200;
//                 clearInterval(spin);
//                 x-=20
//                 ss(x);

//             };
//             // console.log(topIndex, 'topIndex');

//             spin.style.bottom = `-${topIndex}px`;
//         }, x);
//     }

// }, 1000)
// clearInterval(spin);

// function sss(xx){
//     topIndex = 0;
//     let fa;
//     let spinX = setInterval(() => {
//         fa = dqa('one .fa');
//         for (const iterator of fa) {
//             if (iterator.getBoundingClientRect().top-spinOneTop.top > 98) {
//                 iterator.classList.add('oliver');

//             }
//             if (iterator.getBoundingClientRect().top-spinOneTop.top < 98 || iterator.getBoundingClientRect().top-spinOneTop.top > 298) {
//                 iterator.classList.remove('oliver');
//             }

//             };

//         topIndex += 50;
//         if (topIndex == 1200) {
//             topIndex = 200;
//             // clearInterval(spinX);

//             // xx+=100;
//             // console.log(xx);
//             // sss(xx);

//         };

//         xx.style.bottom = `-${topIndex}px`;



//     }, 100);

//     setInterval(()=>{
//     let indRoll = Math.floor(Math.random() * arr2.length);
//         fa = dqa('one .fa');
//         for (const it of fa) {
//             if (it.classList.contains('oliver')&&it.getAttribute('data-id')===indRoll) {
//                 clearInterval(spinX);
//                 }
//         }

//     }, 1000)
// }




casinoBallance.innerHTML = allBalance.toLocaleString();
userMoney.innerHTML = balanseUser.toLocaleString();



bidPanelOne.addEventListener('click', (e) => {
    dq('bid').value = e.target.textContent;
    dq('reff').innerHTML = `Spin my bid ${e.target.textContent}`;
    dq('reff').removeAttribute('disabled');

});

dq('bid').addEventListener('input', () => {
    let regBid = /^[0-9]{0,9}?[^,]?[^.]?([0-9]{0,1})$/gi;
    if (regBid.test(dq('bid').value)) {
        dq('reff').removeAttribute('disabled');
        dq('bid').style.color = 'black';

    } else {
        dq('bid').style.color = 'red';
    }
    if (dq('bid').value<=0) {
        dq('reff').setAttribute('disabled', 'disabled');
    }
});

function start() {
    dq('h3').innerHTML = 0;
    dq('h2').innerHTML = 0;
    firstBid = dq('bid').value;

    if (balanseUser < dq('bid').value) {
        let bal = prompt('You are BANKROT! Put more mony?', 1000);
        balanseUser += +bal;
        userMoney.innerHTML = balanseUser;
    } else {
        bid = dq('bid').value;
        if ((bid * arr2.length) > allBalance) {
            alert(`Max bid: ${allBalance / arr2.length}`);
        } else {
            balanseUser -= bid;
            userMoney.innerHTML = balanseUser;
            setTimeout(() => { roll(0); }, 100);
            setTimeout(() => { roll(1); }, 500);
            setTimeout(() => { roll(2); }, 900);
        }
    }


}

function win() {
    let indexInterval = 0;
    intWin = setInterval(() => {

        if (dq('result').classList.contains('asd')) {
            dq('result').classList.remove('asd');
            for (let index = 0; index < dqa('result h3').length; index++) {
                dqa('result h3')[index].innerHTML = `<i class="fa fa-${arr2[resultGame[index] - 1]} fa-lg"></i>`;
                // dqa('result h3')[index].innerHTML = ;

            }
        } else {
            for (let index = 0; index < dqa('result h3').length; index++) {
                dqa('result h3')[index].innerHTML = `<span class="win">${winArr[index]}<span>`;
                dq('result').classList.add('asd');
            }
        }
        indexInterval++;
        if (indexInterval === 6) {
            clearInterval(intWin);
        }
    }, 500);

}

function roll(x) {
    let index = 0;
    resultGame = [];
    let int = interval + x;
    int = setInterval(() => {
        index++;
        if (index == 4) {
            index = 0;
        }
        dqa('result h3')[x].style.color = 'black';
        dqa('result h3')[x].innerHTML = `<i class="fa fa-${arr2[index]} fa-lg"></i>`;
    }, 100);

    setTimeout(() => {
        clearInterval(int);
        let ind = Math.floor(Math.random() * arr2.length);
        dqa('result h3')[x].innerHTML = `<i class="fa fa-${arr2[ind]} fa-lg"></i>`;
        resultGame.push(ind + 1);
        if (x == 2) {
            checkBid();
        }

    }, 1000);

}

function checkBid() {
    result = dqa('result h3');
    if (resultGame[0] === resultGame[1] && resultGame[1] === resultGame[2]) {
        renderResultWin(resultGame[0]);
        for (const item of result) {
            item.style.color = 'green';
        }
        win();
    } else if (resultGame[0] == resultGame[1]) {
        renderResultLose(resultGame[0]);
        dqa('result h3')[0].style.color = 'orange';
        dqa('result h3')[1].style.color = 'orange';
        win();

    } else if (resultGame[0] == resultGame[2]) {
        renderResultLose(resultGame[0] * 0.5)
        dqa('result h3')[0].style.color = 'orange';
        dqa('result h3')[2].style.color = 'orange';
        win();

    } else if (resultGame[1] == resultGame[2]) {
        renderResultLose(resultGame[1])
        dqa('result h3')[1].style.color = 'orange';
        dqa('result h3')[2].style.color = 'orange';
        win();

    } else {
        dq('bid').value = firstBid;

        updateBalanse();

        for (const item of dqa('result h3')) {
            item.style.color = 'red';
        }

    }
    if (dq('bid').value <= 0) {
        dq('reff').setAttribute('disabled', 'disabled')
    }
}

function updateBalanse(sum) {

    if (sum) {
        balanseUser += sum;
        userMoney.innerHTML = balanseUser;
        allBalance -= sum;
        casinoBallance.innerHTML = allBalance.toLocaleString();
    } else {
        allBalance += +bid;
        casinoBallance.innerHTML = allBalance.toLocaleString();
        // balanseUser-=bid
        // userMoney.innerHTML = balanseUser;
    }
    console.log(allBalance, balanseUser);

}

function renderResultWin(arrIndex) {
    arrIndex++;
    dq('h3').innerHTML = 'x' + arrIndex;
    sum += +bid + (bid * arrIndex);

    dq('h2').innerHTML = sum;


    updateBalanse(sum);
}

function renderResultLose(arrIndex) {
    arrIndex++;
    dq('h3').innerHTML = 'x' + (arrIndex / 2);
    sum = +bid + (bid * (arrIndex / 2));
    dq('h2').innerHTML = sum;
    // if (sum<0) {
    //     alert('You lose');
    // }
    updateBalanse(sum)

}

