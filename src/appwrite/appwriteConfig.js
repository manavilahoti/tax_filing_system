import {Client, Account, Databases, Storage} from "appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67f1db210007f1e98b8f");

export const accoount = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
