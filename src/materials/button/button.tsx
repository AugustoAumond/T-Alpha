import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<'button'>{
    children: ReactNode,
}

export default function Button({children, ...props}: ButtonProps){
    return (
        <button {...props}  className="border-2 border-primaryColor rounded-lg px-3 py-2 text-primaryColor hover:bg-secundaryColor">
            {children}
        </button>
    )
}