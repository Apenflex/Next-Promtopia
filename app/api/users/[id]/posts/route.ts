import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/client'

interface Params {
    id: string
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    const { id } = params
    try {
        const prompts = await prisma.prompt.findMany({
            where: {
                creatorId: id,
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
        // console.log('server', prompts)
        return NextResponse.json(prompts, { status: 200 })
    } catch (error) {
        return new NextResponse('Failed to fetch all prompts', { status: 500 })
    }
}
