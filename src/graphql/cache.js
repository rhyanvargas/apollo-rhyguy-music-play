import {InMemoryCache, makeVar} from '@apollo/client'
// import {storeInLocalStorage} from '../utilities'

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                queue: {
                    read(){
                        return queueItemsVar();
                    },
                    // merge (existing, incoming) {}
                }
            }
        }

    }
})
 

// export const queueItemsVar = makeVar(JSON.parse(JSON.parse(localStorage.getItem('queue'))))
export const queueItemsVar = makeVar([])