import {queueItemsVar} from './graphql/cache'

export const storeInLocalStorage = async (keyString,dataValue) => {
    let queueArray = [];
    let localItem = await new Promise ((resolve) => resolve(localStorage.getItem(keyString)));
    
    // If local object exists,  clear localStorage 
    if(localItem) localStorage.clear(); 
    
    // update new array by adding dataValue 
    const stringifyData = JSON.stringify(dataValue)
    queueArray.push(stringifyData) 

    // push new array to localStorage
    localStorage.setItem(keyString,JSON.stringify(queueArray));
}


export const addOrRemoveSongFrom = (song) => {
    const localStorageArray = localStorage.getItem('queue') ? JSON.parse(localStorage.getItem('queue')) : []
    const cache = queueItemsVar();
    console.log(cache);
}