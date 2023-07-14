"use client"
import { ThemeProvider } from "next-themes";

type PropsType = {
        children: React.ReactNode
}
const TProviders = ({children}: PropsType) => {
    return <ThemeProvider attribute="class">{children}</ThemeProvider>
} 

export default TProviders