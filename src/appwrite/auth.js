import conf from "../conf/conf";


import{Client,Account,ID} from "appwrite"

// const client = new Client()
// .setEndpoint('https://cloud.appwrite.io/v1')

// .setProject('67e588bb0038dc5c07e8');



// const account = new Account(client);

// const user = await account.create(
//     ID.unique(),
//     'email@example.com',
//     'password'
// );

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId);

           this.account = new Account(this.client);
        //    .setKey(conf.apiKey); 
    }

    async createAccount({email,password,name}){
        try{
       const userAccount =   await this.account.create( ID.unique(),email,password,name);
       
        if(userAccount){
            // call another method
            return userAccount;
        } else{
            return  userAccount;
        }
       
        }
        catch(error){
            throw error;
        }
    }

    
}


const authService = new AuthService(); 

export default authService;