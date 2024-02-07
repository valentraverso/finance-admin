import { API_URL } from "@/shared/config/config";

export default async function getAccounts(){
    try{
        const getAccounts = await fetch(`${API_URL}/api/v1/accounts/find/all`);
        const getAccountJson = await getAccounts.json();

        return getAccountJson;
    }catch(err: any){
        return {
            status: false,
            msg: "There was an error"
        }
    }
}