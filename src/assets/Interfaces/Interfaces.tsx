export interface CreatUserProps {
    name?: string,
    taxNumber?: string ,
    mail?: string,
    phone?: string,
    password?: string
}

export interface ObjectProps {
    name: string | undefined,
    description: string | undefined
    price: number | undefined
    stock?: number | undefined
    id?: number | undefined
}
