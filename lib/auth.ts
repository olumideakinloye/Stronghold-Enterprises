import {cookies} from "next/headers";
import {jwtVerify} from "jose";
export async function isAdmin(){try{const token=(await cookies()).get("stronghold_session")?.value;if(!token||!process.env.AUTH_SECRET)return false;await jwtVerify(token,new TextEncoder().encode(process.env.AUTH_SECRET));return true}catch{return false}}
