export const storeInLocalStorage = (keyString,dataValue) => {
    let queueArray = [];
    let localItem = localStorage.getItem(keyString);
    
    // If local object exists,  clear localStorage 
    if(localItem) localStorage.clear(); 
    
    // update new array by adding dataValue 
    const stringifyData = JSON.stringify(dataValue)
    queueArray.push(stringifyData) // update new array

    // push new array to localStorage
    localStorage.setItem(keyString,JSON.stringify(queueArray));
}