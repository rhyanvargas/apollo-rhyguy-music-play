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