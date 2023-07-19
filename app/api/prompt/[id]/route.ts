import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/client'
interface Params {
    id: string
}

// GET
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    try {
        const prompt = await prisma.prompt.findUnique({
            where: {
                id: params.id,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        image: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })
        return NextResponse.json(prompt, { status: 200 })
    } catch (error) {
        return new NextResponse('Failed to fetch all prompts', { status: 500 })
    }
}
// PATCH

// DELETE