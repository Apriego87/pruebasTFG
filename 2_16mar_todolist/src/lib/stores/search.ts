import { writable } from "svelte/store"

/* interface SearchModel {
    data: object; // Define the type of 'data' as needed
    filtered: object; // Define the type of 'filtered' as needed
    search: string;
    additionalSearchTerms: string[]; // Define the type of 'additionalSearchTerms' as string array
    added: string;
} */

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
    data: T[]
    filtered: T[]
    search: string,
    additionalSearchTerms: string[]
}

export const createSearchStore = <T extends Record<PropertyKey, any>>(
    data: T[],
) => {
    const { subscribe, set, update } = writable<SearchStoreModel<T>>({
        data,
        filtered: data,
        search: '',
        additionalSearchTerms: [],
    })

    return {
        subscribe,
        set,
        update
    }
}

export const searchHandler = (store) => {
    const searchTerm = store.search.toLowerCase() || '';
    const additionalSearchTerms = store.additionalSearchTerms.map(term => term.toLowerCase());

    store.filtered = store.data.filter((item) => {
        // Check if all search terms match any property of the item
        return [searchTerm, ...additionalSearchTerms].every(term => {
            return Object.values(item).some(value => {
                if (typeof value === 'string') {
                    const lowercaseValue = value.toLowerCase();
                    return lowercaseValue.includes(term);
                }
                return false;
            });
        });
    });
};