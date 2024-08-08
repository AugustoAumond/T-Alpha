import { useState } from "react"
import { api } from "../../../../materials/axios/axios";
import Input from "../../../../materials/input/input";
import Button from "../../../../materials/button/button";
import { CgClose } from "react-icons/cg";

interface CreateProductProps {
    CloseCreateNewProduct: () => void
}

export default function CreateNewProductModal({CloseCreateNewProduct}: CreateProductProps){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<string | undefined>();
    const [stock, setStock] = useState<number | undefined>();

    async function CreateProduct(){
        const token = JSON.stringify(localStorage.getItem('token'))

        if (token !== undefined){

            await api.post('api/products/create-product',{
                name, description, price, stock
            },{
                headers: {
                    'Authorization': `Bearer ${token.replaceAll('"', '')}`
                }
            })
            CloseCreateNewProduct();
        }

    }

    return (
        <div className="fixed h-full w-full flex items-center justify-center bg-primaryColor bg-opacity-80">
            <main className="relative w-full h-full max-w-[600px] max-h-[600PX] bg-terciaryColor rounded-lg p-6 flex flex-col items-center gap-8">
                <div onClick={CloseCreateNewProduct} className="absolute right-4 top-4 text-primaryColor">
                    <CgClose></CgClose>
                </div>


                <p className="text-2xl text-primaryColor">
                    CRIAR NOVO PRODUTO           
                </p>

                <div className="flex flex-col w-full gap-4">
                    <Input>
                        <p className="text-lg text-primaryColor">NOME DO PRODUTO:</p>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="text" placeholder="Digite seu nome do produto" />
                    </Input>

                    <Input>
                        <p className="text-lg text-primaryColor">DESCRIÇÃO:</p>
                        <input type="text" value={description} onChange={(e) => setDescription(e.currentTarget.value)}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" placeholder="Descrição do produto"/>
                    </Input>

                    <div className="flex items-center justify-center gap-5">
                        <Input>
                            <p className="text-lg text-primaryColor">PREÇO:</p>
                            <input value={price} onChange={(e) => setPrice(e.target.value.toString())} className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="string" placeholder="Preço do produto" />
                        </Input>

                        <Input>
                            <p className="text-lg text-primaryColor">ESTOQUE:</p>
                            <input value={stock} onChange={(e) => setStock(parseInt(e.currentTarget.value))}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 truncate" type="number"  placeholder="Quantidade de itens no estoque" />
                        </Input>
                    </div>
                </div> 

                <div className="flex flex-col gap-2 text-center">
                    <p className="text-2xl text-red-900"></p>
                </div>

                <div className="flex w-full items-center justify-center gap-4">
                    <div className="flex w-full items-center justify-center gap-4">
                        <Button onClick={CreateProduct} className="border-2 border-primaryColor rounded-lg px-3 py-2 text-primaryColor hover:bg-secundaryColor">
                            CRIAR PRODUTO
                        </Button>

                        <Button onClick={CloseCreateNewProduct} className="border-2 border-primaryColor rounded-lg px-3 py-2 text-primaryColor hover:bg-secundaryColor">
                            VOLTAR
                        </Button>
                    </div>
                </div>
            </main> 
        </div>
    )
}