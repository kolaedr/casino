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


dq('reff').addEventListener('click', (e) => {
  
    start();
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

casinoBallance.innerHTML = allBalance.toLocaleString();
userMoney.innerHTML = balanseUser.toLocaleString();

if (dq('put-nomey').hasAttribute('disabled')||dq('reff').hasAttribute('disabled')) {
    dq('put-nomey').style.color = 'rgb(177, 164, 224)';
    dq('reff').style.color = 'rgb(177, 164, 224)';
}

bidPanelOne.addEventListener('click', (e) => {
    dq('bid').value = e.target.textContent;
    dq('reff').innerHTML = `Spin my bid ${e.target.textContent}`;
    dq('reff').removeAttribute('disabled');
    dq('reff').style.color = '#fff';

});

dq('put-nomey').addEventListener('click', () => {
    balanseUser += +dq('put-nomey-input').value;
    dq('ballans').innerHTML = balanseUser;
    dq('put-nomey-input').value='';
    dq('put-nomey').setAttribute('disabled', 'disabled');
    if (dq('put-nomey').hasAttribute('disabled')) {
        dq('put-nomey').style.color = 'rgb(177, 164, 224)';
    }
});

dq('put-nomey-input').addEventListener('input', () => {
    let regBalance = /^\d{1,5}([,.]{1}?\d{1,2}?)?$/gi;
    if (regBalance.test(dq('put-nomey-input').value)&&dq('put-nomey-input').value>0) {
        dq('put-nomey').removeAttribute('disabled');
        dq('put-nomey-input').style.color = 'black';
        dq('put-nomey').style.color = '#fff';
    } else {
        dq('put-nomey-input').style.color = 'red';
        dq('put-nomey').style.color = 'rgb(177, 164, 224)';
        dq('put-nomey').setAttribute('disabled', 'disabled');
    }
});

dq('bid').addEventListener('input', () => {
    if (dq('bid').value>(allBalance / arr2.length)) {
        
        dq('max-bid').innerHTML = `Max bid: ${allBalance / arr2.length}`;
        dq('massage-error').style.top = 0;
        setTimeout(()=>{
            dq('massage-error').style.top = '-6em';
        }, 2000);
    }
    let regBid = /^\d{1,9}([,.]{1}?\d{1,2}?)?$/gi;
    if (regBid.test(dq('bid').value)) {
        dq('reff').removeAttribute('disabled');
        dq('bid').style.color = 'black';

    } else {
        dq('bid').style.color = 'red';
    }
    if (dq('bid').value <= 0) {
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
    }

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

