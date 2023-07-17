import '@/styles/globals.css'

import Provider from '@/app/auth/Provider'
import Nav from '@/components/Nav'

export const metadata = {
    title: 'Promtopia',
    description: 'Discover & Share AI Prompts',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}
