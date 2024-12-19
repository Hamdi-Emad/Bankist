"use strict";

//* BANKIST APP

//* Data
const account1 = {
   owner: "Jonas Schmedtmann",
   movements: [
      200.36, 450.99, -400.23, 3000.31, -650.28, -130.12, 70.96, 1300.49,
   ],
   interestRate: 1.2, // %
   pin: 1111,
   movementsDates: [
      "2023-11-01T13:15:33.035Z",
      "2023-11-30T09:48:16.867Z",
      "2023-12-25T06:04:23.907Z",
      "2024-01-25T14:18:46.235Z",
      "2024-02-05T16:33:06.386Z",
      "2024-04-10T14:43:26.374Z",
      "2024-09-29T18:49:59.371Z",
      "2024-10-03T12:01:20.894Z",
   ],
   currency: "EUR",
   locale: "pt-PT", // de-DE
};

const account2 = {
   owner: "Jessica Davis",
   movements: [
      5000.78, 3400.25, -150.13, -790.36, -3210.45, -1000.35, 8500.12, -30.13,
   ],
   interestRate: 1.5,
   pin: 2222,
   movementsDates: [
      "2020-11-18T21:31:17.178Z",
      "2020-12-23T07:42:02.383Z",
      "2021-01-28T09:15:04.904Z",
      "2022-04-01T10:17:24.185Z",
      "2022-05-08T14:11:59.604Z",
      "2023-05-27T17:01:17.194Z",
      "2024-07-11T23:36:17.929Z",
      "2024-07-12T10:51:36.790Z",
   ],
   currency: "USD",
   locale: "en-US",
};

const account3 = {
   owner: "Steven Thomas Williams",
   movements: [
      200.98, -200.36, 340.87, -300.99, -20.49, 50.69, 400.19, -460.22,
   ],
   interestRate: 0.7,
   pin: 3333,
   movementsDates: [
      "2020-11-01T13:15:33.035Z",
      "2020-11-30T09:48:16.867Z",
      "2020-12-25T06:04:23.907Z",
      "2021-01-25T14:18:46.235Z",
      "2022-02-05T16:33:06.386Z",
      "2022-04-10T14:43:26.374Z",
      "2023-06-25T18:49:59.371Z",
      "2024-07-26T12:01:20.894Z",
   ],
   currency: "EUR",
   locale: "de-DE", // de-DE
};

const account4 = {
   owner: "Sarah Smith",
   movements: [430.13, 1000.61, 700.94, 50.23, 90.16],
   interestRate: 1,
   pin: 4444,
   movementsDates: [
      "2022-11-18T21:31:17.178Z",
      "2022-12-23T07:42:02.383Z",
      "2023-01-28T09:15:04.904Z",
      "2023-04-01T10:17:24.185Z",
      "2023-05-08T14:11:59.604Z",
   ],
   currency: "EUR",
   locale: "fr-FR",
};
const account5 = {
   owner: "Hamdi Emad",
   movements: [260.13, 990.61, -340.94, 680.23, -190.16, 640.2, 1650.23],
   interestRate: 1,
   pin: 5555,
   movementsDates: [
      "2023-11-18T21:31:17.178Z",
      "2023-12-23T07:42:02.383Z",
      "2024-01-28T09:15:04.904Z",
      "2024-04-01T10:17:24.185Z",
      "2024-05-08T14:11:59.604Z",
      "2024-07-08T14:11:59.604Z",
      "2024-10-06T14:11:59.604Z",
   ],
   currency: "EGP",
   locale: "ar-EG",
};

const accounts = [account1, account2, account3, account4, account5];

//* Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//*=====================================================================================
//*                     🚀🚀🚀🚀 Start Project 🚀🚀🚀🚀
//*=====================================================================================

const formatMovementDate = function (date, locale) {
   const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

   const daysPassed = calcDaysPassed(new Date(), date);
   console.log(daysPassed);

   if (daysPassed === 0) return "Today";
   if (daysPassed === 1) return "Yesterday";
   if (daysPassed <= 7) return `${daysPassed} days ago`;
   else {
      // const day = `${date.getDate()}`.padStart(2, '0');
      // const month = `${date.getMonth() + 1}`.padStart(2, '0'); // 0 based
      // const year = date.getFullYear();
      // return `${day}/${month}/${year}`;
      return new Intl.DateTimeFormat(locale).format(date);
   }
};

const formatCur = function (value, locale, currency) {
   return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
   }).format(value);
};

const displayMovements = function (acc, sort = false) {
   containerMovements.innerHTML = "";

   const movs = sort
      ? acc.movements.slice().sort((a, b) => a - b)
      : acc.movements;

   movs.forEach((mov, i) => {
      const type = mov > 0 ? "deposit" : "withdrawal";

      const date = new Date(acc.movementsDates[i]);
      const displayDate = formatMovementDate(date, acc.locale);

      const formattedMov = formatCur(mov, acc.locale, acc.currency);

      const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}
      </div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
      </div>
      `;

      containerMovements.insertAdjacentHTML("afterbegin", html);
   });
};
// displayMovements(account1.movements); //* هنستخدمها تحت
console.log(containerMovements.innerHTML); //* ❤️ بص هنا علشان تستوعب الفكرة

//*========================================================================

const calcDisplayBalance = function (acc) {
   acc.ballance = acc.movements.reduce((acc, mov) => acc + mov, 0);

   labelBalance.textContent = formatCur(acc.ballance, acc.locale, acc.currency);
};
// calcDisplayBalance(account1.movements); //* هنستخدمها تحت

//*========================================================================

const user = "Steven Thomas Williams"; // stw
const createUsernames = function (accs) {
   accs.forEach((acc) => {
      acc.username = acc.owner
         .toLowerCase()
         .split(" ")
         .map((name) => name[0])
         .join("");
   });
   //* This function performs a side effect, meaning it does some work without returning anything 👀
   //* We loop over the accounts array, and in each iteration, we manipulate the
   //* current account object by adding a username property based on the account owner's name.
};
createUsernames(accounts);
console.log(accounts);

//*========================================================================

const calcDisplaySummary = function (acc) {
   const incomes = acc.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
   labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

   const out = acc.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
   labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

   const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * acc.interestRate) / 100)
      .filter((int, i, arr) => {
         console.log(arr);
         return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
   labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};
// calcDisplaySummary(account1.movements); //* هنستخدمها تحت

//*========================================================================

const updateUI = function (acc) {
   //^ Display movements
   displayMovements(acc);

   //^ Display balance
   calcDisplayBalance(acc);

   //^ Display summary
   calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
   const tick = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);

      //* in each call, print the remaining time to UI
      labelTimer.textContent = `${min}:${sec}`;

      //* When 0 seconds, stop timer and log out user
      if (time === 0) {
         clearInterval(timer);
         labelWelcome.textContent = `Log in to get started`;
         containerApp.style.opacity = 0;
      }

      //* Decrese 1s
      time--;
   };

   //* set time to 5 minutes
   let time = 300;

   //* Call the timer every second
   tick();
   const timer = setInterval(tick, 1000);
   return timer;
};

let currentAccount, timer;

//* FAKE ALWAYS LOGGED IN
// currentAccount = account2;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (e) {
   e.preventDefault();
   currentAccount = accounts.find(
      (acc) => acc.username === inputLoginUsername.value
   );
   console.log(currentAccount);

   if (currentAccount?.pin === +inputLoginPin.value) {
      console.log(" ❤️ عاش عليك");
      //^ Display UI and message
      labelWelcome.textContent = `Welcome back, ${currentAccount.owner
         .split(" ")
         .slice(0, 1)
         .join(" ")}`;

      containerApp.style.opacity = 1;

      console.log(currentAccount.movementsDates);

      //^ Create current date and time
      //* Experimenting API
      const now = new Date();

      const options = {
         hour: "numeric",
         minute: "numeric",
         day: "numeric",
         month: "long", //* numeric OR long OR 2-digit
         year: "numeric", //* numeric OR 2-digit
         weekday: "long", //* logn OR short OR narrow
      };

      //* ar-EG هيجيبلك تنسيق الوقت علي حسب المتصفح بتاعك بشكل دينامك , انا تنسيق الوقت عندي
      // const locale = navigator.language;
      // console.log(locale);

      labelDate.textContent = new Intl.DateTimeFormat(
         currentAccount.locale,
         options
      ).format(now);

      // const day = `${now.getDate()}`.padStart(2, '0');
      // const month = `${now.getMonth() + 1}`.padStart(2, '0'); // 0 based
      // const year = now.getFullYear();
      // const hour = `${now.getHours()}`.padStart(2, '0');
      // const minutes = `${now.getMinutes()}`.padStart(2, '0');
      // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

      // //^ Add transfer date
      // currentAccount.movementsDates.push(new Date().toISOString());
      // receiverAcc.movementsDates.push(new Date().toISOString());

      //^ Clear input field
      inputLoginUsername.value = "";

      inputLoginPin.value = "";
      inputLoginPin.blur();

      //^ Timer
      if (timer) {
         clearInterval(timer);
      }
      timer = startLogOutTimer();

      //^ Update UI
      updateUI(currentAccount);
   }
});

//*========================================================================

btnTransfer.addEventListener("click", function (e) {
   e.preventDefault();
   const amount = +inputTransferAmount.value;
   const receiverAcc = accounts.find(
      (acc) => acc.username === inputTransferTo.value
   );

   console.log(amount, receiverAcc);
   inputTransferAmount.value = inputTransferTo.value = "";

   if (
      amount > 0 &&
      currentAccount.ballance >= amount &&
      receiverAcc?.username !== currentAccount.username
   ) {
      alert(" Transfer Successful ✅");
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      //^ مهمة اوي اوي اوي
      //^ Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());

      //^ Update UI
      updateUI(currentAccount);

      //^ Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();
   } else {
      {
         alert("Transfer Failed ❌");
      }
   }
});

//*========================================================================

btnLoan.addEventListener("click", function (e) {
   e.preventDefault();

   const amount = Math.floor(inputLoanAmount.value);

   if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= amount * 0.1)
   ) {
      //* هيعمل القرض ف خلال ثانيتين ونصف
      setTimeout(function () {
         //^ Add The Movement
         currentAccount.movements.push(amount);

         //^ Add Loan date
         currentAccount.movementsDates.push(new Date().toISOString());

         //^ Update UI
         updateUI(currentAccount);

         //^ Reset Timer
         clearInterval(timer);
         timer = startLogOutTimer();
      }, 2500);
   } else {
      alert("Request Loan Failed ❌");
   }
   inputLoanAmount.value = "";
});

//*========================================================================

btnClose.addEventListener("click", function (e) {
   e.preventDefault();
   console.log("Delete");

   if (
      inputCloseUsername.value === currentAccount.username &&
      +inputClosePin.value === currentAccount.pin
   ) {
      const index = accounts.findIndex(
         (acc) => acc.username === currentAccount.username
         //* الخاص بالعنصر مش العنصر نفسه index بالظبط بس بترجع الـ find زي الـ
      );
      console.log(index);

      //^ Delete Account
      accounts.splice(index, 1);

      //^ Hide UI
      containerApp.style.opacity = 0;
   }

   inputCloseUsername.value = inputClosePin.value = "";
});

//*========================================================================

let sorted = false;
btnSort.addEventListener("click", function (e) {
   e.preventDefault();
   displayMovements(currentAccount, !sorted);
   sorted = !sorted;
});

//*=====================================================================================
//*                     🎯🎯🎯🎯 End Project 🎯🎯🎯🎯
//*=====================================================================================

//!========================================================
//^================= Simple Array Methods =================
//!========================================================

/*

let arr = ['a', 'b', 'c', 'd', 'e'];

//! Slice :
//! Watch this method dosn't change the original array
console.log(arr.slice(2)); //^ جديدة وبتسيب القديمة ف حالها array خلي بالك علشان هي بترجع
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1)); //^ Always the last element in any array
console.log(arr.slice(1, -2));
console.log(arr.slice()); //^ to make a shallow copy of any array
console.log(arr.slice([...arr])); //^ to make a shallow copy of any array

//! Splice :
//! Watch this method change the original array (mutate)
// console.log(arr.splice(2)); //^ بنقول ليه اقطع من ال اراي من اول اندكس 2
// console.log(arr); //^ بص بقي عمل ايه ف ال اراي الاصلية , هتلاحظ انه مقطوع منها الجزء ال قصيناه
// console.log(arr.splice(-1)); //^ بنستخدمها علشان نقص اخر عنصر من ال اراي

console.log(arr.splice(1, 2));
//^ واحدة واحدة بقي , احنا فوق قولنا ليه اننا عايزين نبدأ القطع من اول اندكس 1 , وبعد كدة قولنا ليه
//^ اننا عايزين نقطع عنصرين فقط

//! Reverse :
//! Watch this method change the original array (mutate)
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse()); //^ هيرتب ال اراي
console.log(arr2); //^ هتلاقي تأثيره بقي موجود علي ال اراي الاصلية

//! Concat :
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); //^ لكن بكل بساطة نقدر نعملها بالطريقة دي

//! Join :
console.log(letters.join(' - '));

*/

//!========================================================
//^================== The new at Method ===================
//!========================================================

/*

const arr = [23, 11, 64];
console.log(arr[0]); //^ array at position 0
console.log(arr.at(0)); //^ array at position 0

//^ getting the last array element
console.log(arr[arr.length - 1]); //^ علشان اجيب اخر عنصر جوا ال اراي
console.log(arr.at(arr.length - 1)); //^ علشان اجيب اخر عنصر جوا ال اراي
console.log(arr.slice(-1)[0]); //^ علشان اجيب اخر عنصر جوا ال اراي
console.log(arr.at(-1)); //^ علشان اجيب اخر عنصر جوا ال اراي

//! at method also works on strings :
console.log('jonas'.at(0)); //^ string at position 0 , هيجيب اول عنصر
console.log('jonas'.at(-1)); //^ string at position -1 , هيجيب اخر عنصر

*/

//!========================================================
//^=============== Looping Arrays: forEach ================
//!========================================================

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} : You Deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} : You Withdrew ${Math.abs(movement)}`);
  }
}

console.log(`-------- ForEach --------`);
//! Countinu and breack dose not work here
movements.forEach((movement, i, arr) => {
  if (movement > 0) {
    console.log(`Movement ${i + 1} : You Deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} : You Withdrew ${Math.abs(movement)}`);
  }
});

*/

//!========================================================
//^============== forEach With Maps and Sets ==============
//!========================================================

/*

//* Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

console.log(...currencies);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

//* Set
//! The key exact the value ❤️ , WHY of that ? beacuse the set dosen't have keys , in it dosen't have indexes
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach((value, _, map) => {
  console.log(`${_}: ${value}`);
});

*/

//!========================================================
//^================== Coding Challenge 1 ==================
//!========================================================

/*

const checkDogs = function (dogsJulia, dogsKate) {

  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);

  const dogs = dogsJuliaCorrected.concat(dogsKate);

  console.log(dogs);

  dogs.forEach((dog, i) => {
    //* ممكن كدة
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }

    //* وممكن كدة
    // dog >= 3
    //   ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`)
    //   : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

*/

//!========================================================
//^=== Data Transformations with map, filter and reduce ===
//!========================================================

/*
  درس نظري
*/

//!========================================================
//^==================== The map method ====================
//!========================================================

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

//* make a new array with a new elements
//* the original array not change
//* map method doesnt mutate the original array , but its make a new array ❤️

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

//* --------------
//* here we mannualy create a new array but in map we dont do this mannualy

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

//* --------------
const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1} : You ${mov > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(
      mov
    )}`

  // if (mov > 0) {
  //   return `Movement ${i + 1} : You Deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1} : You Withdrew ${Math.abs(mov)}`;
  // }
);

console.log(movementsDescriptions); //* جديدة فيها نتيجة الشروط ال فوق دي Array هيرجع

*/

//!========================================================
//^=================== The filter method ==================
//!========================================================

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//^ Filter طريقة الـ
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//^ For Loop طريقة الـ
const depositsFor = [];
const withdrawalFor = [];
for (let i = 0; i < movements.length; i++) {
  if (movements[i] > 0) {
    depositsFor.push(movements[i]);
  } else {
    withdrawalFor.push(movements[i]);
  }
}
console.log(depositsFor);
console.log(withdrawalFor);

//^ For Of طريقة الـ
const depositsOf = [];
const withdrawalOf = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsOf.push(mov);
  } else {
    withdrawalOf.push(mov);
  }
}
console.log(depositsOf);
console.log(withdrawalOf);

*/

//!========================================================
//^=================== The reduce method ==================
//!========================================================

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//* accumulator -> SNOWBALL
//* الزيرو ده القيمة المبدأية , تقدر تحط اي قيمة مبدأية غير الزيرو عادي
const ballance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(ballance);

//* previous code with for of loop:
let finalBalance = 0;
for (const mov of movements) {
  finalBalance += mov;
}
console.log(finalBalance);

//^ Maximum Value
const max = movements.reduce((cur, mov) => (cur > mov ? cur : mov), movements[0]);

console.log(max);

*/

//!========================================================
//^================== Coding Challenge 2 ==================
//!========================================================

/*

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);
  const average = adults.reduce((acc, cur) => acc + cur, 0) / adults.length;
  return average;
};
const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(average1);

const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(average2);

*/

//!========================================================
//^============= The Magic Of Chaining Methods ============
//!========================================================

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

//* PIPLINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

*/

//!========================================================
//^================== Coding Challenge 3 ==================
//!========================================================

/*

const calcAverageHumanAgee = ages => {
  const average = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  return average;
};

console.log(calcAverageHumanAgee([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgee([16, 6, 10, 5, 6, 1, 4]));

*/

//!========================================================
//^=================== The Find Method ====================
//!========================================================

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0);
//^ اوعي تنسي ان الفيلتر بترجع كل العناصر ال بتطابق الشرط
//^ بترجع العنصر نفسه وخلاص find لكن الـ new Array الفيلتر بتعمل
//^ بترجع اول قيمة تطابق الشرط بس find  الـ
//^ هنا هترجع اول عنصر في الاراي بينطبق عليه الشروط
//^ متنساش هترجع اول عنصر بتنطبق عليه الشروط بس
//^ وبالتالي حسب الكود احنا طالبين اول قيمة سالب وال بالتالي هي -400
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

*/

//!========================================================
//^================= The findIndex Method =================
//!========================================================

/*

//* بالظبط ولكن هنا بنكتب الشرط ف بيجيب الاندكس الخاص بالحاجة ال ينطبق عليها الشرط ده find زي الـ
let arr = ['hamdi', 'haneen', 'ahmed', 'shahenda', 'ali', 'laila'];
//* بناءً علي الشروط ال هكتبها دي ali ف لنفرض اني عايز اعرف الاندكس الخاص ب 
console.log(arr.findIndex((user) => user.length <= 3)); //* هيطبع 4 وده فعلاً الاندكس الخاص ب علي

*/

//!========================================================
//^==================== Some And Every ====================
//!========================================================

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(`_____________________________________________________`);
console.log(`====================== Some =========================`);

//& EQUALITY
//^ here we can check if there is (-130) in array ?
console.log(movements.includes(-130)); //* True

//^ here we can check if there is (90) in array ?
console.log(movements.includes(90)); //* False

console.log(`-----------------`);

//& CONDITION
//^ here we can check if there is value upove 0 ?
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

console.log(movements.some(mov => mov === -130));

//^ هنلاحط كدة ان هما متشابهين

console.log(`_____________________________________________________`);
console.log(`====================== Every ========================`);

const positiveNum = [430, 1000, 700, 50, 90];
const negativeNum = [-50, -40, -30, -10, -20];

console.log(movements.every(mov => mov > 0)); //* False
console.log(positiveNum.every(mov => mov > 0)); //* True
console.log(negativeNum.every(mov => mov < 0)); //* True

//^ The (EVERY) returns (TRUE) if (ALL) the elements in the array (SATISFY) The condition

console.log(`-----------------`);

//? Separate Callback
// const deposit = function (mov) {
//   mov > 0;
// };
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.map(deposit));
console.log(movements.filter(deposit));

//* DRY بدل ماتكتب الفانكشن جوا الاقواس بتكتبها برا منفردة وتحط المتغير بتاعها بس , علشان مبدأ الـ
//* DRY (Don't Repeat Yourself)
//* filter, reduce, map بس خلي بالك اننا نقدر نعمل الحركة دي معاهم كلهم سواء او اياً كان

*/

//!========================================================
//^=================== Flat And FlatMap ===================
//!========================================================

/*

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //* [1, 2, 3, 4, 5, 6, 7, 8] هيطبع دي وده شيء جامد جداً

const arrDeep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arrDeep.flat(2)); //* 2 level of deep
//* بمعني انك كل ما كان عندك اراي داخليه بتعمق المجال زي ما انا عمقت المجال بمقدار 2
//* علي حسب بقي عمق ال اراي

const accountMovments = accounts.map(acc => acc.movements);

const allMovements = accountMovments.flat();

const overalBalance = allMovements.reduce((acc, cur) => acc + cur, 0);

console.log(overalBalance); //* 17840

//* Flat
const overalBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);

console.log(overalBalance2); //* 17840

//* FlatMap
//* FlatMap Method حاجة شائعة ف الاكواد البرمجية عملوا الـ flat() ويعد منها جزئية الـ map علشان جزئية الـ
//* Flat() ثم بعدها علي طول بتعمل Map وال بكل بساطة عبارة عن انها بتعمل
const overalBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);

console.log(overalBalance3); //* 17840

*/

//!========================================================
//^========================= Sort =========================
//!========================================================

/*

//* Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
owners.sort();
console.log(owners); //* الأصلية علشان كدة لازم تخلي بالك وانت بتستخدمها Array للـ mutate بيعمل

//* Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.sort()); //* الترتيب الخاص بيها ابجدي

//* return < 0, A, B (Keep Order)
//* return > 0, B, A (Switch Order)

//* Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

//* Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

*/

//!========================================================
//^============== Creatings & Fillings Arrays =============
//!========================================================

/*

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

//^ Empty Array + fill methods
const x = new Array(7);
console.log(x); //* Empty
console.log(x.map(() => 5)); //* Empty
x.fill(1, 3, 5);
console.log(x);

arr.fill(22, 2, 6);
console.log(arr);

//^ Array.from
const y = Array.from({ length: 7 }, () => 2);
console.log(y);

const z = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(z);

//* كنت بجرب طريقة تانية من دماغي لنفس المثال ال فوق
let t = [];
for (let i = 1; i <= 10; i++) {
  t.push(i);
}
console.log(t);

labelBalance.addEventListener('click', function () {
  //* Change (node list) to (array) we use (Array.from) ❤️❤️❤️
  //* دي الطريقة الاولي للتحويل
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  //* spread الطريقة التانية هي عبارة عن الـ
  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(
    el => el.textContent
  );
  console.log(movementsUI2);
  //* حتة الماب ف الطريقة التانية اضافية مني
});

//* أقدر اعمل كدة حتي لو الحاجة ال هبدلها جزء من سترينج replace هنا كنت بتأكد اني ف الـ
let g = ['hamdi', 'haneen', 'hayam', 'hala', 'hager', 'heba'];
console.log(g.map(el => el.replace('h', '7')));

//* هنا بختبر نفسي لو قاعد ف انترفيو وطلبوا مني اعمل اراي فيها من 1 ل 10 بطريقتين مختلفتين
//* First Way
const oneToTen = Array.from({ length: 10 }, (_, i) => 1 + i);
console.log(oneToTen);

//* Second Way
const one2Ten = [];
for (let i = 1; i <= 10; i++) {
  one2Ten.push(i);
}
console.log(one2Ten);

*/

//!========================================================
//^================ Array Methods Practice ================
//!========================================================

/*

//&============================
//^ 1) sum all of the deposits
//&============================
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(acc => acc > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum);

//&============================
//^ 2) 5 Deposits over than 1000
//&============================
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);
// .filter(mov => mov >= 1000).length;
console.log(accounts.flatMap(acc => acc.movements).filter(_ => _ >= 1000));
console.log(numDeposits1000);

//! watch here
let a = 10;
console.log(a++); //! still 10 until next iteration
console.log(a); //* 11

//! طيب ايه الحل ؟
let b = 10;
console.log(++b); //* 11

//&============================
//^ 3) create a new object with deposits & withdrawals
//&============================
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

const obj = {
  name: 'hamdi',
  gender: 'male',
  age: 22,
};

console.log(obj.name);
console.log(obj.gender);
console.log(obj.age);

console.log(obj['age']);
console.log(obj['gender']);
console.log(obj['name']);

//&============================
//^ 4) Convert AnyString To Title Case
//&============================
//* This is a nice title -> This Is a Nice Title
const converTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'and', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titleCase;
};

console.log(converTitleCase('This is a nice title'));
console.log(converTitleCase('This is a LONG title but not too long'));
console.log(converTitleCase('and here is another title with an EXAMPLE'));

*/

//!========================================================
//^================== Coding Challenge 4 ==================
//!========================================================

/*

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//* 1)
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

//* 2)
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);

console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

//* 3)
const ownerEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownerEatTooMuch);

const ownerEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownerEatTooLittle);

//* 4)
// ^ "Matilda and Alice and Bob's dogs eat too much!"
// ^ "Sarah and John and Michael's dogs eat too Little!"
console.log(`${ownerEatTooMuch.join(' and ')}'s dogs eat to much`);
console.log(`${ownerEatTooLittle.join(' and ')}'s dogs eat to Little`);

//* 5)
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//* 6)
console.log(
  dogs.some(
    dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
  )
);

//* 7)
console.log(
  dogs.filter(
    dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
  )
);

//* 8)
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);

*/

//!========================================================
//^============ Converting And Checking Numbers ===========
//!========================================================

/*

console.log(23 === 23.0);

//* Base 10 - 0 to 9 | 1/10 = 0.1 | 3/10 = 3.3333
//* Binary base 2 - 0 to 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); //* المفروض صح ولكنه هيطبع خطأ

//* Number and (+)
console.log(`========= Number & (+) =========`);
console.log(Number('23'));
console.log(+'23'); //* type corrosion

//* Parse
console.log(`========= parse =========`);
console.log(Number.parseInt('30px', 10)); //* هيطبع 30
console.log(Number.parseInt('px30', 10)); //* NaN لكن لو كتبنا ال سترينج الاول هيطبع لينا

console.log(Number.parseInt('2.5rem')); //* هيشيل التيكست وكمان ال بعد العلامة
console.log(Number.parseFloat('2.5rem')); //* هيشيل التيكست وهيسيب ال بعد العلامة لانه مخصص لكدة

//^ خلي بالك ان المسافات مش بتأثر هنا
console.log(Number.parseInt('  2.5rem  ')); //* هيشيل التيكست وكمان ال بعد العلامة
console.log(Number.parseFloat('  2.5rem  ')); //* هيشيل التيكست وهيسيب ال بعد العلامة لانه مخصص لكدة

//* isNaN
console.log(`========= isNaN =========`);
console.log(Number.isNaN(3 * 's')); //* NaN  =   3 * 's'  هيطبع  ( ترو )  لان نتيجة
console.log(Number.isNaN(+'20x')); //*  NaN  =  '20x'     هيطبع  ( ترو )  لان نتيجة
console.log(Number.isNaN(20)); //* False
console.log(Number.isNaN(20 / 0)); //* False

console.log(20 / 0); //* Infinity

//* isFinite
console.log(`========= isFinite =========`);
//^ The best way of checking if (VALUE) is number
console.log(Number.isFinite(20)); //*      True  =>  لان الفاليو رقم
console.log(Number.isFinite('20')); //*    False =>  لان الفاليو سترينج
console.log(Number.isFinite(+'20')); //*   True  =>  لان الفاليو رقم
console.log(Number.isFinite(20 / 0)); //*  False =>  Infinity لان الفاليو هتكون حاجة اسمها

//* isInteger
console.log(`========= isInteger =========`);
console.log(Number.isInteger(0)); //*       true
console.log(Number.isInteger(22)); //*      true
console.log(Number.isInteger(+'12')); //*   True
console.log(Number.isInteger(22 / 0)); //*  False
console.log(Number.isInteger('hamdi')); //* False
console.log(Number.isInteger('hamdi')); //* False

*/

//!========================================================
//^=================== Math And Rounding ==================
//!========================================================

/*

//* sqrt  ( Square root )  الجذر التربيعي
console.log(Math.sqrt(20));
console.log(25 ** (1 / 2)); //* كإنك بتقوله 25 اس نص

//* max
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '35', 23, 11, 2)); //* type corrosion هتعمل

//* min
console.log(Math.min(7, 18, 23, 11, 5));
console.log(Math.min(5, 18, '35', 23, 11, '2')); //* type corrosion هتعمل

//* PI الثابت باي
console.log(Math.PI);

//* How To Calc the area pf circle 😂
console.log(Math.PI * Number.parseFloat('10px') ** 2);

//* random
console.log(Math.trunc(Math.random() * 20) + 1);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1)) + min;
console.log(randomInt(5, 10));

const random100 = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1)) + min;
console.log(random100(95, 100));

//* rounding integers
console.log(Math.trunc(23.3)); //*remove any decemal part => 23

//^ All of these method also do ( Type Corrosion ) ⚠️⚠️⚠️
//^ round
console.log(Math.round(2.6)); //* لو العدد العشري 5 او اكبر ف هي بتجيب الرقم ال بعد كدة وهنا هتجيب 3
console.log(Math.round(2.5)); //* لو العدد العشري 5 او اكبر ف هي بتجيب الرقم ال بعد كدة وهنا هتجيب 3
console.log(Math.round(2.4)); //* لو العدد العشري اقل من 5 ف هي بتجيب الرقم الاساسي وهنا هتجيب 2
console.log(Math.round('2.4')); //* لو العدد العشري اقل من 5 ف هي بتجيب الرقم الاساسي وهنا هتجيب 2
//! مع الارقام السالبة شغال عادي
console.log(Math.round(-99.6)); //* الناتج هيكون -100
console.log(Math.round(-99.2)); //* الناتج هيكون -99

//^ ceil
console.log(Math.ceil(2.6)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم ال بعد كدة وهنا هتجيب 3
console.log(Math.ceil(2.1)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم ال بعد كدة وهنا هتجيب 3
console.log(Math.ceil(2.5)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم ال بعد كدة وهنا هتجيب 3
console.log(Math.ceil('2.5')); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم ال بعد كدة وهنا هتجيب 3
console.log(Math.ceil(2.4)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم ال بعد كدة وهنا هتجيب 3
console.log(Math.ceil(99.1)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم ال بعد كدة وهنا هتجيب 100
//! مع الارقام السالبة بيعمل العكس
console.log(Math.ceil(-99.9)); //* الناتج هيكون -99

//^ floor
console.log(Math.floor(2.6)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم الاساسي وهنا هتجيب 2
console.log(Math.floor(2.1)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم الاساسي وهنا هتجيب 2
console.log(Math.floor(2.5)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم الاساسي وهنا هتجيب 2
console.log(Math.floor('2.5')); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم الاساسي وهنا هتجيب 2
console.log(Math.floor(2.4)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم الاساسي وهنا هتجيب 2
console.log(Math.floor(99.9)); //* ملهاش دعوة طول مافيه رقم عشري يبقي هتجيب الرقم الاساسي وهنا هتجيب 99
//! مع الارقام السالبة بيعمل العكس
console.log(Math.floor(-99.9)); //* الناتج هيكون -100

//^ Rounding decimals ( ().toFixed() )
//^ بمعني رقم عشري اقل من خمسة يبقي هترجع الرقم الاساسي rounding شغالة بنفس طريقة الـ
//^ ولو رقم عشري يساوي 5 او اكبر من 5 بترجع الرقم ال بعد الرقم الاساسي
//^ ولكن السطرين ال فوق دول بيتحققوا بس ف حالة انك مضفتش حاجة ف خانة التحكم ف عدد الارقام العشرية
//^ ولكن ولكن بترجع الرقم ك سترينج لذلك يجب عليك تحويله لرقم بعد اتمام العملية
//^ نقدر نتحكم ف عدد الارقام العشرية ال عايزنها
//^ ف خلي بالك متحطش فيها رقم ك سترينج type corrosion مش بتعمل
//! Number خلي بالك بترجع الرقم ك سترينج ف لازم تحط قبلها + او
console.log(+(2.72423123).toFixed()); //* هترجع 3
console.log(+(2.32423123).toFixed()); //* هترجع 2

*/

//!========================================================
//^================ The Remainder Operator ================
//!========================================================

/*

console.log(5 % 2); //* 1

console.log(15 % 4); //* 3
console.log(15 / 4); //* 3.75

console.log(8 % 3); //* 2
console.log(8 / 3); //* 2.666666666

//* كل الاعداد الزوجية تقبل القسمة علي 2
//* وبالتالي باقي قسمة اي عدد زوجي علي 2 بيكون 0
//* ممكن نستخدم المنطق ده ف التحقق من الارقام اذا كانت زوجية او فردية
console.log(6 % 2); //* 0
console.log(6 / 2); //* 3

console.log(7 % 2); //* 1
console.log(7 / 2); //* 3.5

const isEven = n => (n % 2 === 0 ? 'The Number Is Even' : 'The Number Is Odd');
console.log(isEven(20)); //* The Number Is Even
console.log(isEven(0)); //* The Number Is Even
console.log(isEven(51)); //* The Number Is Odd
console.log(isEven(323)); //* The Number Is Odd

// let handeler = false;
// labelBalance.addEventListener('click', function () {
//   handeler = !handeler;
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (handeler) {
//       if (i % 2 === 0) {
//         row.style.backgroundColor = 'red';
//       } else {
//         row.style.backgroundColor = 'yellow';
//       }
//     } else {
//       row.style.backgroundColor = 'white';
//     }
//   });
// });

let handeler = false;

labelBalance.addEventListener('click', function () {
  handeler = !handeler;
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (handeler) {
      if (i % 2 === 0) {
        row.style.backgroundColor = 'red';
      } else {
        row.style.backgroundColor = 'yellow';
      }
    } else {
      row.style.backgroundColor = 'white';
    }
  });
});

*/

//!========================================================
//^================== Numeric Separators ==================
//!========================================================

/*

const diameter = 287_460_000_000; //* Dont Worry JS (Ignore) The _Underscore
console.log(diameter);

const priseCents = 345_99;
console.log(priseCents);

const transferFee1 = 15_00;
console.log(transferFee1);
const transferFee2 = 1_500;
console.log(transferFee2);

const PI = 3.14_15;
//^ غير مسموح استخدام الاندرسكور ف الاول او ف الاخر او بعد العلامة العشرية مباشرة او قبلها مباشرة
console.log(PI);

console.log(Number('23000000')); //* هتشتغل عادي
console.log(Number('23_000')); //* NaN مش هتشتغل وهيقولك
console.log(parseInt('23_000')); //* هيطبع الجزء ال قبل العلامة وال هو 23

*/

//!========================================================
//^================= Working With Bigint ==================
//!========================================================

/*

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(5645645645645645645645645645645645645456n);
console.log(BigInt(56456456));

//* Operators
console.log(10000n + 10000n);
console.log(
  123415648754254872424124125454654n * 64564564412412414213456435212346n
);

// console.log(Math.sqrt(16n)); //! مش هتشتغل

const huge = 12564564354231231545453164n;
const num = 23;

console.log(huge * BigInt(num));
//* هيطلعلك ايرور BigInt داخل الـ num لو محطتش الـ
//! (Cannot mix BigInt and other types, use explicit conversions) ده شكل الايرور

console.log(20n > 15); //* True

console.log(20n == 20); //* True القيمة واحدة كأننا بنقوله "20" == 20 وبالتالي فيه تايب كوريشن هيقولنا
console.log(20n === 20); //* False القيمة واحدة لكن نوع البيانات مختلف كأننا بنقوله "20" === 20 وبالتالي هيقولنا

console.log(typeof 20n); //* bigint

console.log(huge + ' is really big!!!'); //* will remove n and log the number like a string

//* Divisions
console.log(10 / 3);
console.log(10n / 3n); //* Will cut the decemil part so will log 3n

*/

//!========================================================
//^=================== Creating Dates =====================
//!========================================================

/*

//* create a date
const now = new Date();
console.log(now);

console.log(`=================`);

console.log(new Date('Oct 03 2024 02:11:28'));

console.log(`=================`);

console.log(new Date('December 24, 2015'));

console.log(`=================`);

console.log(new Date(account1.movementsDates[0]));

console.log(`=================`);

console.log(new Date(2037, 10, 19, 15, 23, 5)); //* month here is zero based يعني بيبدأ من 0

console.log(`=================`);

console.log(new Date(2037, 10, 33)); //* كتبنا يوم زيادة وبالتالي

console.log(`=================`);

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

console.log(`⛔⛔⛔⛔| 🕛 Working With Dates 🕛 |⛔⛔⛔⛔`);

//* Working With Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(`====== Year ======`);
console.log(future.getFullYear()); //* السنة

console.log(`====== Month ======`);
console.log(future.getMonth()); //* الشهر وبيبدأ من 0

console.log(`====== Month's Days ======`);
console.log(future.getDate()); //* أيام الشهر

console.log(`====== Week's Days ======`);
console.log(future.getDay()); //* ايام الاسبوع و0 هنا معناه الحد لان الاسبوع عندهم بيبدأ الحد

console.log(`====== Hours  ======`);
console.log(future.getHours());

console.log(`====== Minutes ======`);
console.log(future.getMinutes());

console.log(`====== Seconds ======`);
console.log(future.getSeconds());

console.log(`====== Full Year With ISO ======`);
console.log(future.toISOString()); //* 2037-11-19T13:23:00.000Z <= بيجيب التاريخ بمعياير دولية

console.log(`====== Date With Miliseconds ======`);
console.log(future.getTime()); //* هيجيب التاريخ باللملي سكند

console.log(`====== Convert Miliseconds To Date ======`);
console.log(new Date(2142249780000)); //* حطيت ملي سكند التاريخ ال فوق ف جابلي التاريخ مكتوب

console.log(`====== No Defferent both are the same ======`);
//* الاتنين واحد مفيش اختلاف بينهم
console.log(new Date().getTime()); //* هتجيب الوقت الحالي بالملي سكند
console.log(Date.now()); //* هتجيب الوقت الحالي بالملي سكند

console.log(`====== set a new full year ======`);
future.setFullYear(2040);
console.log(future);

*/
//!========================================================
//^================= Operations With Dates ================
//!========================================================

/*

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);
console.log(Number(future));

const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

const days1 = calcDaysPassed(
  new Date(2037, 3, 4),
  new Date(2037, 3, 24, 12, 8)
);
console.log(days1);

*/

//!========================================================
//^============ Internationalizing Dates (Intl) ===========
//!========================================================

/*

const timeNow = new Date();

//* بنستخدمها علشان نحدد تنسيق الوقت بتاعنا
const timeOptions = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long', //* numeric OR long OR 2-digit
  year: 'numeric', //* numeric OR 2-digit
  weekday: 'long', //* logn OR short OR narrow
};

//* ar-EG هيجيبلك تنسيق الوقت علي حسب المتصفح بتاعك بشكل دينامك , انا تنسيق الوقت عندي
const local = navigator.language;
console.log(local);

console.log(new Intl.DateTimeFormat(local, timeOptions).format(timeNow));
//* ف هيعرض التاريخ كدة => الاثنين، ٧ أكتوبر ٢٠٢٤ في ١٠:١٨ م , ar-EG علشان تنسيق الوقت عندي

console.log(new Intl.DateTimeFormat("en-EG", timeOptions).format(timeNow));
//* Monday, October 7, 2024 at 10:21 PM هيعرض التاريخ كدة 

console.log(new Intl.DateTimeFormat("en-US", timeOptions).format(timeNow));
//* لانه الوقت بالنسبة للتنسيق الامريكي  Monday, October 7, 2024 at 10:21 PM هيعرض التاريخ كدة 

console.log(new Intl.DateTimeFormat("fr-FR", timeOptions).format(timeNow));
//* لانه الوقت بالنسبة للتنسيق الفرنسي  lundi 7 octobre 2024 à 22:22 هيعرض التاريخ كدة 

console.log(new Intl.DateTimeFormat("pt-PT", timeOptions).format(timeNow));
//* لانه الوقت بالنسبة للتنسيق البرتغالي  segunda-feira, 7 de outubro de 2024 às 22:22 هيعرض التاريخ كدة 

*/

//!========================================================
//^========== Internationalizing Numbers (Intl) ===========
//!========================================================

/*

const num = 3884764.23;
//* هننسق الرقم علي حسب كل دولة

//* أمريكا ( ومش محتاج اقولك انها سبب مشاكل نص الكوكب وخاصة الشرق الاوسط 😡 )
console.log('US:', new Intl.NumberFormat('en-US').format(num)); //* 3,884,764.23

//* ❤️ أم الدنيا حبيبة قلبي
console.log('EG:', new Intl.NumberFormat('ar-EG').format(num)); //* ٣٬٨٨٤٬٧٦٤٫٢٣
console.log('EG:', new Intl.NumberFormat('en-EG').format(num)); //* 3,884,764.23

//* فرنسا ( مبحبهاش خالص ومش بتنزلي من زور نهائي 😒 )
console.log('FR:', new Intl.NumberFormat('fr-FR').format(num)); //* 3 884 764,23

//* ❤️ وكمان جوناس حبيبنا و صاحب الكورس , Siuuuuuuuuuuuuuu البرتغال بلد رونالدو عمي وعم عيالي
console.log('PT:', new Intl.NumberFormat('pt-PT').format(num)); //* 3 884 764,23

//* 😂 المملكة المتحدة , طبعاً انت مش عارف الفرق بين انجلترا و بريطانيا والمملكة المتحدة متقلقش انا كنت زيك
console.log('UK:', new Intl.NumberFormat('en-UK').format(num)); //* 3,884,764.23

//* 😘❤️ ألمانيا , ويابخت من راح المانيا
console.log('GR:', new Intl.NumberFormat('de-DE').format(num)); //* 3,884,764.23

//* 😂❤️ ايطاليا , تحسها محافظة مصرية بسبب كم المصريين ال هناك
console.log('IT:', new Intl.NumberFormat('it-IT').format(num)); //* 3.884.764,23

//* ===========================

//* ف هيعرض الارقام بالتنسيق العربي ar-EG تقدر طبعاً تستخدم تنسيق المتصفح , وبما ان المتصفح عندي تنسيقه
console.log('Browser:', new Intl.NumberFormat(navigator.language).format(num)); //* ٣٬٨٨٤٬٧٦٤٫٢٣

//* ===========================

//* Options Formating نقدر نعمل :
const options = {
  style: 'unit',
  unit: 'mile-per-hour',
  // useGrouping: false, //* ده بيمنع الفواصل والعلامات بين الارقام , قولت اكتبه علشان تبقي واخد فكرة عنه
};

//* mph => mile per hour
console.log('US:', new Intl.NumberFormat('en-US', options).format(num)); //* 3,884,764.23 mph

//* ===========================

//* ممكن نعمل فورمات لدرجة الحرارة :
const option = {
  style: 'unit',
  unit: 'celsius',
  // useGrouping: false, //* ده بيمنع الفواصل والعلامات بين الارقام , قولت اكتبه علشان تبقي واخد فكرة عنه
};

//* °C => celsius
console.log('US:', new Intl.NumberFormat('en-US', option).format(num)); //* 3,884,764.23°C

//* ===========================

//* ممكن نعمل فورمات للنسبة المؤية:
const optionn = {
  style: 'percent',
  unit: 'celsius', //* بما انه نسبة مؤية هيتجاهل نسبة درجة الحرارة دي متقلقش يعني
  // useGrouping: false, //* ده بيمنع الفواصل والعلامات بين الارقام , قولت اكتبه علشان تبقي واخد فكرة عنه
};

//* % => percent
console.log('US:', new Intl.NumberFormat('en-US', optionn).format(num)); //* 388,476,423%

//* ===========================

//* ممكن نعمل فورمات للعملة:
const optionnn = {
  style: 'currency',
  currency: 'EUR',
  unit: 'celsius', //* بما انه عملة هيتجاهل نسبة درجة الحرارة دي متقلقش يعني
  // useGrouping: false, //* ده بيمنع الفواصل والعلامات بين الارقام , قولت اكتبه علشان تبقي واخد فكرة عنه
};

//* € => EUR يورو
//* ف امريكا علامة اليورو بتتحط قبل الرقم , وفي اوروبا علامة اليورو بتتحط بعد الرقم
console.log('US:', new Intl.NumberFormat('en-US', optionnn).format(num)); //* €3,884,764.23

*/

//!========================================================
//^========== Timers: setTimeout and setInterval ==========
//!========================================================

/*

//*==================== setTimeout ======================

//^ setTimeout
//* بتشتغل ( مرة واحدة ) بعد وقت معين

setTimeout(function () {
  console.log(`Here Is Your Pizza 🍕`);
}, 3000);

//*============

const ingredients = ['olives', 'spinach'];

setTimeout(
  (ing1, ing2) => console.log(`Here Is Your Pizza 🍕 with ${ing1} and ${ing2}`),
  5000,
  'olives',
  'spinach'
);

//*============

setTimeout(
  function (ing1, ing2) {
    console.log(`Here Is Your Pizza 🍕 with ${ing1} and ${ing2}`);
  },
  5000,
  ...ingredients
);

//*============

const pizzaTimer = setTimeout(
  function (ing1, ing2) {
    console.log(`Here Is Your Pizza 🍕 with ${ing1} and ${ing2} ❌❌❌`);
  },
  5000,
  ...ingredients
);

if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer);
}

//*============
console.log(`Waiting...`);

//*==================== setInterval ========================

//^ setInterval
//* بتشتغل ( كل مرة ) بعد وقت معين

setInterval(function () {
  const now = new Date();
  console.log(now.getSeconds() === 0 ? 60 : now.getSeconds());
}, 1000);

*/

//!========================================================
//^============ Implementing a Countdown Timer ============
//!========================================================
