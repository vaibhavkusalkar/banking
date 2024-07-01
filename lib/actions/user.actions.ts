'use server';

import { signInProps, SignUpParams } from "@/types";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

// ...

export async function getLoggedInUser() {
    try {
      const {account} = await createSessionClient();
      const user = await account.get(); ///after this line nothing is executuoing
      //console.log(user);
      return await parseStringify(user);
    } catch (error) {
		  console.log('Error',error);
      return null;
    }
  }

export const signIn = async ({email, password}: signInProps) => {
    try {
      const { account } = await createAdminClient();
      const response = await account.createEmailPasswordSession(email, password);
	    console.log(parseStringify(response));
      return parseStringify(response);
    } catch (error) {
        console.log('Error', error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData;

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        return parseStringify(newUserAccount);
    } catch (error) {
        console.log('Error', error)
    }
}

// export async function getLoggedInUser() {
//     try {
//       const {account} = await createSessionClient();
//       const user = await account.get();
//       console.log(parseStringify(user));
//       return await parseStringify(user);
//     } catch (error) {
//       return null;
//     }
//   }
  