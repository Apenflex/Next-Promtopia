import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";

export const POST = async (req: NextRequest) => {
    const { userId, prompt, tag } = await req.json();
    try {} catch (error) {}
}