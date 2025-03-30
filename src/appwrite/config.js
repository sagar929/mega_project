import conf from '../conf/conf'
import { Client,ID, Databasese, Storage,Query, Account } from 'appwrite';

export class service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
             .setEndpoint(conf.appwriteUrl)
             .setProject(confirm.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage (this.client);

    }
    async function createPost({title,slug,content,featuredImage,status,userId}) {
        try{
     return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,{
            title,
            content,
            featuredImage,
            status,
            userId,
        }
     )
        }catch(error){
            console.log("Appwrite service :: createPost :: error" ,error)
        }
    }
    async function updatePost({title,slug,content,featuredImage,status,userId}) {
     try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
     }catch(error){
        console.log("Appwrite service :: updatePost :: error",error)
     }
        
    }
    async function deletePost(slug) {
        try{
               await this.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
               )

               return true
        }catch(error){
            console.log("Appwrite service :: deletePost :: error",error);

            return false;

        }
    }
    async getPost(slug) {
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

        }catch (error){
            console.log("Appwrite service :: getPost :: error",error);
            return false
        }
    }
    async function getPosts (queries = [Query.equal("status","active")]) {
        try{
        return await this.databasses.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            [
                Query.equal("status","active")
            ]

            
        )
        }catch{
            console.log("Appwrite serive :: getPosts :: error",error);
            return false;
        }
    }
    async function uploadFile(file) {
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                TextDecoder.unique(),
                file
            )
        } catch (error){
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
        
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            
        } catch (error){
            console.log("Appwrite service :: delete :: error" ,error);
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}



const service = new Service()
export default service

