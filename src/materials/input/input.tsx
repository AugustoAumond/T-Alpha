import { ComponentProps, ReactNode } from "react"

interface InputsProps extends ComponentProps<'input'> {
    children: ReactNode,
}

export default function Input({children} : InputsProps){

    
    return (
        <div className="flex flex-col gap-2 flex-1 w-full">
            {children}
        </div>
    )
}