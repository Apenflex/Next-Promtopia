import { NextRequest, NextResponse } from "next/server";

import prisma from '@/prisma/client'

export const GET = async (req: NextRequest) => {
    try {
        const prompts = await prisma.prompt.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                creator: {
                    select: {
                        image: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
        return NextResponse.json(prompts, { status: 200 })
    } catch (error) {
        return new NextResponse('Failed to fetch all prompts', { status: 500 })
    }
}