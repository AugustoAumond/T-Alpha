export default function CleamForms(
    setNameEdit: (e: string) => void, 
    setPriceEdit: (e: number) => void, 
    setStockEdit: (e: number) => void, 
    setDescriptionEdit: (e: string) => void,
    name: string | undefined,
    price?: number,
    description?: string,
    stock?: number
){
    if (name) {
        setNameEdit(name)
    }
    
    if (price){
        setPriceEdit(price)
    }

    if (description){
        setDescriptionEdit(description)
    }

    if (stock){
        setStockEdit(stock)
    }
    
}

