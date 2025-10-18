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
        } else if (age > 18 && age <= 65) {
            console.log("No discount for this age group");
        } else {
            console.log("30% Discount for Senior");
        }
    } else {
        console.log("Enter the valid age");
    }
}


/**
 * calulate Area 
 */

let length = prompt("Enter the length");
let width = prompt("Enter the width");

let area = (length,width) => length*width;
console.log(`Area of rectangle : ${area(length,width)}`);

/**
 * Object 
 * Create a online store make variable name product and key name , price and inStock
 */

let product = {
    p1 : {
        name : "Sugar" , 
        price : "45 Rs/kg" , 
        inStock : "75kg"
    }, 
    p2 : {
        name : "Rice" , 
        price : "70 Rs/kg" , 
        inStock : "500kg"
    } , 
    p3 : {
        name : "Maggi" , 
        price : "20 Rs." , 
        inStock : "90"
    }
}
displayProduct(product);

function displayProduct(product) {
    for (const plist in product) {
        for (const key in product[plist]) {
            console.log(`In ${plist} ${key} : ${product[plist][key]}`);
        }
    }
}


/**
 * Guest list 
 * INside the guest list if guest present then pass 
 * welcome to the party
 * If not found "Sorry you are not allowed"
 */

let checkguest = (guest) => {
    let guestList = ['sumit','vikas','aakas','shivam'];
    if(guestList.includes(guest)) {
        console.log(`Welcome to party ${guest}`);
    } else {
        console.log(`Sorry,you are not in guest list`);
    }
}

let guest = prompt("Enter the guest name");
checkguest(guest);