import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/prisma/client'

export const POST = async (req: NextRequest) => {
    const { userId, prompt, tag } = await req.json()
    try {
        const newPrompt = await prisma.prompt.create({
            data: {
                prompt,
                tag,
                creator: { connect: { id: userId } },
            },
        })
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response('Server Error', { status: 500 })
    }
}
