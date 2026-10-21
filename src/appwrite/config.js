import { Client, Databases, Storage, ID, Query, TablesDB } from "appwrite";
import conf from "../configure/conf";
import { retry } from "@reduxjs/toolkit/query";


export  class ServiceConfig {
    client = new Client();
    tablesdb;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesdb = new TablesDB(this.client);
        this.storage = new Storage(this.client);

         console.log("Sending ping to Appwrite...");

  this.client
    .ping()
    .then((response) => {
      console.log("Appwrite ping response:", response);
    })
    .catch((error) => {
      console.error("Appwrite ping failed:", error);
    });
        
    }
    

    async createPost({ title, slug, content, featureImage, status, userId , date }) {
        try {
            return await this.tablesdb.createRow(
                {
                    databaseId: conf.appwriteDatabaseId,
                    tableId: conf.appwriteCollectionId,
                    rowId: slug,
                    data: {
                        title,
                        content,
                        featureImage,
                        status,
                        userId,
                        date
                    }
                }
            )

        } catch (error) {
            console.log(`Appwrite CreatePost Erorr :: ${error}`)
        }

    }


    async updatePost(slug, { title, content, featureImage, status }) {
        try {
            return await this.tablesdb.updateRow(
                {
                    databaseId: conf.appwriteDatabaseId,
                    tableId: conf.appwriteCollectionId,
                    rowId: slug,
                    data: {
                        title,
                        content,
                        featureImage,
                        status

                    }
                }
            )

        } catch (error) {
            console.log(`Appwrite UpdatePost Erorr :: ${error}`)
        }

    }

    async deletePost(slug) {
        try {
            await this.tablesdb.deleteRow(
                {
                    databaseId: conf.appwriteDatabaseId,
                    tableId: conf.appwriteCollectionId,
                    rowId: slug,

                }

            )
            return true
        } catch (error) {
            console.log(`Appwrite DeletePost Erorr :: ${error}`)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesdb.getRow(
                {
                    databaseId: conf.appwriteDatabaseId,
                    tableId: conf.appwriteCollectionId,
                    rowId: slug,

                }

            )

        } catch (error) {
            console.log(`Appwrite GetPost Erorr :: ${error}`)

        }
    }

    async ListPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.tablesdb.listRows(
                {
                    databaseId: conf.appwriteDatabaseId,
                    tableId: conf.appwriteCollectionId,
                    queries : queries
                }

            )

        } catch (error) {
            console.log(`Appwrite List Posts Erorr :: ${error}`)

        }
    }

    // File Upload 


    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            });
        } catch (error) {
            console.error("Appwrite UploadFile Error:", error);
            return false;
        }
    }



    async deleteFile(fileId) {

        try {
            await this.storage.deleteFile(
                {
                    bucketId: conf.appwriteBucketId,
                    fileId: fileId

                }
            )
            return true
        } catch (error) {
            console.log(`Appwrite DeleteFile :: error ${error}`)
            return false
        }

    }

    filePreview(fileId) {
        return this.storage.getFileView(
            
               { bucketId : conf.appwriteBucketId,
                 fileId : fileId
                }
            
        )
    }

}

const service = new ServiceConfig()

export default service