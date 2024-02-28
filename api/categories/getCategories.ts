import { API_URL } from "@/shared/config/config";

export default async function getCategories(){
    try{
        const getAccounts = await fetch(`${API_URL}/api/v1/categories/find/all`);
        const getAccountJson = await getAccounts.json();

        return getAccountJson;
    }catch(err: any){
        return {
            status: false,
            msg: "There was an error"
        }
    }
}