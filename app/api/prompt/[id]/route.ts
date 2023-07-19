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
        return new NextResponse('Failed to fetch prompt', { status: 500 })
    }
}
// PATCH
export const PATCH = async (req: NextRequest, { params }: { params: Params }) => {
    const { prompt, tag } = await req.json()

    try {
        const existingPrompt = await prisma.prompt.findUnique({
            where: {
                id: params.id,
            },
        })
        if (!existingPrompt) {
            return new NextResponse('Prompt not found', { status: 404 })
        }
        const updatedPrompt = await prisma.prompt.update({
            where: {
                id: params.id,
            },
            data: {
                prompt: prompt,
                tag: tag,
            },
        })
        return NextResponse.json(updatedPrompt, { status: 200 })
    } catch (error) {
        return new NextResponse('Failed to update prompt', { status: 500 })
    }
}

// DELETE
export const DELETE = async (req: NextRequest, { params }: { params: Params }) => {
    try {
        const existingPrompt = await prisma.prompt.findUnique({
            where: {
                id: params.id,
            },
        })
        if (!existingPrompt) {
            return new NextResponse('Prompt not found', { status: 404 })
        }
        const deletedPrompt = await prisma.prompt.delete({
            where: {
                id: params.id,
            },
        })
        return new NextResponse('Prompt deleted successfully', { status: 200 })
    } catch (error) {
        return new NextResponse('Failed to delete prompt', { status: 500 })
    }
}