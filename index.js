const prompt = require('prompt-sync')();

/**
 * Give Discount on the basis of age 
 * 1) age < 18 , 20% discount 
 * 2) age > 18 and age <= 65 , 0% discount
 * 3) age > 65 , 30% senior discount
 */

let age = prompt("Enter the age of person : ");
getDiscountOnBasisOfAge(age);

function getDiscountOnBasisOfAge(age) {
    age = Number (age);
    if (!isNaN(age)) {
        if(age < 18 ) {
            console.log("You are eligible for 20% discount");    
        } else if (age >= 18 && age <= 65) {
            console.log("No discount for this age group");
        } else {
            console.log("30% Discount for Senior");
        }
    } else {
        console.log("Enter valid Age");
    }
}

console.log([] + {});
console.log({} + []);


