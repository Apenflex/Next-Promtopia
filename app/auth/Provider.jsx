'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

const Provider = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            <Toaster />
            {children}
        </SessionProvider>
    )
}
export default Provider
