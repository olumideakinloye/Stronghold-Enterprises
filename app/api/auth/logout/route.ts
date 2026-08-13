import {NextResponse} from "next/server";export async function GET(req:Request){const res=NextResponse.redirect(new URL("/admin/login",req.url));res.cookies.delete("stronghold_session");return res}
