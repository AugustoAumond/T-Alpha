import { ObjectProps } from "../../../Interfaces/Interfaces"

interface CardProps {
    OpenViewMore: (e: ObjectProps) => void
    name: string | undefined,
    description: string | undefined
    ChangePrice: ((e: number) => string | undefined)
    items: ObjectProps
    price: number | undefined
}

export default function Card({name, OpenViewMore, ChangePrice, description, items, price}:CardProps){
    return (
        <div onClick={() => OpenViewMore(items)} className="w-44 h-64 flex flex-col items-center just gap-5 bg-secundaryColor p-2 rounded-lg hover:scale-105">
            <p className="text-primaryColor">{name}</p>
            <div className="bg-primaryColor w-4/5 h-20 rounded-lg flex items-center justify-center">
                IMAGEM
            </div>

            <div className="flex flex-col gap-4 items-center">
                <p className="text-primaryColor text-lg text-center">{description}</p>

                <p className="text-primaryColor text-lg">R$: {ChangePrice(price ? price : 0)}</p>
            </div>
        </div>
    )
}