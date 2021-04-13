const p = document.getElementById('p'),
      q = document.getElementById('q'),
      message = document.getElementById('message'),
      encrypt = document.querySelector('.encrypt-button'),
      decrypt = document.querySelector('.decrypt-button');


let n = f = e = d = 0,
    arrayOfPrimes = [],
    arrayOfCoprimes = [],
    encryptedMessage = [];

encrypt.addEventListener('click', () => {
    n = p.value * q.value;
    f = (p.value - 1) * (q.value - 1);

    isPrime(f, arrayOfPrimes);

    for (let i = 0; i < arrayOfPrimes.length; i++) {
        isCoprime(f, arrayOfPrimes[i]);
    }

    e = arrayOfCoprimes[0];

    console.log(`Публичный ключ: ${e}, ${n}`);

    let flag = 1,
        i = 1;

    while(flag) {

        if ((i * e) % f == 1 && i > f) {
            d = i;
            flag--;
        }

        i++;
    }

    console.log(`Закрытый ключ: ${d}, ${n}`);

    encryptedMessage = (message.value ** e) % n;

    console.log(`Зашифрованное сообщение: ${encryptedMessage}`);
});

decrypt.addEventListener('click', () => {
    const d = document.getElementById('d'),
          n = document.getElementById('n');

    let decryptedMessage = (BigInt(encryptedMessage) ** BigInt(d.value)) % BigInt(n.value);

    console.log(`Расшифрованное сообщение: ${decryptedMessage}`);

});


//Функция нахождения простых чисел
function isPrime(number, array) {
    nextPrime:
    for (let i = 3; i <= number; i++) { // Для всех i...
    
      for (let j = 2; j < i; j++) { // проверить, делится ли число..
        if (i % j == 0) continue nextPrime; // не подходит, берём следующее
      }
    
      array.push(i); // Пополняет массив простым числом
    }
}

//Функция нахождения взаимно простых чисел
function isCoprime(a, b) { 
    let memory = b;
    let NOD = 0;
    while (b) {
        NOD = a % b;
        a = b;
        b = NOD;
    }
    if (Math.abs(a) === 1) {
        arrayOfCoprimes.push(memory);
    }
}

