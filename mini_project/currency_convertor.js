// For interacting with API we need HTTPS module 
import { log } from "console";
import { response } from "express";
import https from "https";

// Now, interact with CLI we need readline module 
/**
 * Q) What is CLI ?
 * - The full form of CLI in computer terminology is Command-Line Interface. 
 * - It is a text-based system that allows users to interact with a computer by typing commands into a console
 *   or terminal window, rather than using a mouse and graphical icons 
 */
import Readline  from "readline";

const rl = Readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

// get the api from https://app.exchangerate-api.com/
const apiKey = "f2fe3c8b19a1c96cda61cc13";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

/**
 * Objective: 
 * - We need to convert the Currency on the basis of USD
 * - And the API we hit it TAKE USD as base value 
 * - Now if we need to find for ex: 90 USd = ? INR
 * - For this i need to now the 1USD = ? INR
 * - for same 90 * ? INR
 */

https.get(url, (response) => {
    let data = "";
    response.on('data' , (chunk) => {
        data += chunk;
    })

    response.on('end' , () => {
        const rates = JSON.parse(data).conversion_rates;
        rl.question("Enter the amount in USD : " , (amount) => {
            rl.question("Enter the targeted currancy : " , (currency_type) => {
                console.log("Currency Type Present or not : ", currency_type.toUpperCase() in rates);
                if(rates.hasOwnProperty(currency_type.toUpperCase())) {
                    const rate = rates[currency_type.toUpperCase()];
                    console.log(`${amount} USD is : ${convertCurrency(amount,rate)} ${currency_type.toUpperCase()}`);
                } else {
                    console.log(`Enter the valide Currency`);
                }
                rl.close();
            })
        })
    })
})

const convertCurrency = (amount,rate) => amount *= rate;