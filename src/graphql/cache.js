import {InMemoryCache, makeVar} from '@apollo/client'

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                queueItems() {
                    return queueItemsVar();
                }
            }
        }

    }
})
 

export const queueItemsVar = makeVar([])