import { AsyncStorage } from 'react-native';
import * as dateMethods from './dateMethods';


//Grab the object under the key expenses and return it
export const getAsyncStorage = async () => {
    let response = await AsyncStorage.getItem('expenses');
    let parsedData = JSON.parse(response) || {};

    return parsedData;
}

// Override the expenses object in storage with the object passed in as an argument
export const setAsyncStorage = (expenses) => {
    return AsyncStorage.setItem('expenses', JSON.stringify(expenses));
}

//Grab the month and year from dateMethods, then grab the expenses object in storage
//If that object does not exist or does not have any data for the given year and/or month
// return false, otherwise return the budget:
export const checkCurrentMonthBudget = async () => {
    let year = dateMethods.getYear();
    let month = dateMethods.getMonth();
    
    let response = await getAsyncStorage();

    if (response === null || !response.hasOwnProperty(year) || !response[year].hasOwnProperty(month)) {
        return false;
    }

    return response[year][month].budget;
}

// In saveMonthlyBudget, we grab the expenses object, then we check to see whether the
// result exists; this is so that we can seed AsyncStorage with a default empty object if we
//need to, which is important for a new user who hasn't entered data into the app before:
export const saveMonthlyBudget = async (month, year, budget) => {
    let response = await getAsyncStorage();

    if(!response.hasOwnProperty(year)) {
        response[year] = {};
    }

    if (!response[year].hasOwnProperty(month)) {
        response[year][month] = {
            budget: undefined,
            expenses: [],
            spent: 0
        }
    }

    response[year][month].budget = budget;

    await setAsyncStorage(response);

    return;
}

//Check wether expenses object has the specific year passed to it, and then wether that year has an object pointing to the month
// if not we create it, 
export const resetAsyncStorage = () => {
    return setAsyncStorage({});
}

//Grab the expenses object in local storage and log it to the console.
export const logAsyncStorage = () => {
    let response = await getAsyncStorage();

    console.log('Logging Async Storage ... ');
    console.table(response);
}