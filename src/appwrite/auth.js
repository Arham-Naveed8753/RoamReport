import { Client, Account, ID } from "appwrite";
import conf from "../configure/conf";

export class AuthService {
     client = new Client();
     account ;

    constructor(){
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async signUp({email , password , name }){
        try {
        const userAccount = await this.account.create({
            userId : ID.unique() ,
            email : email ,
            password : password ,
            name : name
        })
        if(userAccount){
            // Calls another function
            return this.login({
                email : email ,
                password : password
            }) 
        }
        else{
            return userAccount ;
        }
        } catch (error) {
            throw error
        }

     }

     async login({email , password}) {
        try {
            return  await this.account.createEmailPasswordSession({
                email : email ,
                password : password
            })
        } catch (error) {
            throw error
        }
     }

     async getCurrentUser(){
       try {
        return await this.account.get();
       } catch (error) {
        console.log(`Appwrite Service :: getCurrentUser : error ${error}`)
       }
       return null ;
     }
     async logOut(){
        try {
            this.account.deleteSessions();
        } catch (error) {
            console.log(`Appwrite service error :: Logout : error ${error}`);
        }

     }

}


const authService = new AuthService() ;

export default authService