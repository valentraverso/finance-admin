import { API_URL } from "@/shared/config/config";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

export default async function getAccounts() {
    const freecurrencyapi = new Freecurrencyapi('fca_live_0zgtc4uFC12CtMa7MOOEHOYnmwalKDMjO0k9G19Y');

    try {
        const getAccounts = await fetch(`${API_URL}/api/v1/accounts/find/all`);
        const getAccountJson = await getAccounts.json();

        // Sum all accounts balance
        const accountTotal = await getAccountJson.data.reduce(
            async (prev: any, actual: any) => {
                // Resolve promise of previous interaction
                const prevI = await prev;

                // Convert other currencies to EUR
                const conversionRate = actual.currency !== "EUR" && await freecurrencyapi.latest({
                    base_currency: actual.currency,
                    currencies: 'EUR'
                })    

                // Sum actual balance to previous total
                prevI.balance += actual.currency == "EUR" ? actual.balance : actual.balance * conversionRate.data.EUR;

                // Round balance to have max 2 decimals
                return {...prevI, balance: Math.round(prevI.balance * 100) / 100};
            },
            Promise.resolve({ _id: "total", name: "Total", currency: "EUR", balance: 0, entity: "Total" })
        );

        // Push sum of all account into response of fetch
        getAccountJson.data.push(accountTotal);

        return getAccountJson;
    } catch (err: any) {
        return {
            status: false,
            msg: "There was an error"
        }
    }
}