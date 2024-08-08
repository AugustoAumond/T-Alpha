import { useState } from "react"
import { api } from "../../../../materials/axios/axios"

import { CgClose } from "react-icons/cg"
import Input from "../../../../materials/input/input"
import Button from "../../../../materials/button/button"



interface ModalProps{
    name?: string
    price?: number
    description?: string
    CloseModal: () => void
    id?: number
    stock?: number
}

export default function EditItemModal({
name, price, description, CloseModal, id, stock
}: ModalProps){
    const [edit, setEdit] = useState(false);
    const [nameEdit, setNameEdit] = useState<string | undefined>(name)
    const [descriptionEdit, setDescriptionEdit] = useState<string | undefined>(description)
    const [priceEdit, setPriceEdit] = useState<number | undefined | ''>(price)
    const [stockEdit, setStockEdit] = useState<number | undefined | ''>(stock)
    const [endDelete, setEndDelete] = useState(false);
    const [endEdite, setEndEdite] = useState(false);

    function OpenEdit(){
        setEdit(true);
    }

    function CloseEdit(){
        setEdit(false)

        setPriceEdit(price)
        setDescriptionEdit(description)
        setStockEdit(stock)
        setNameEdit(name)
    }
    


    function ChangePrice(value: number){
        const newPrice = value.toString().split('');
        const cont = newPrice?.length;

        if (cont === 3) {
            newPrice.splice(cont-1, 0,'.');
            return (newPrice.join(''))
        } else if (cont > 3) {
            newPrice.splice(cont-2, 0,'.');
            return (newPrice.join(''))
        } else if (cont < 3){
            newPrice.push('.');
            newPrice.push('0');
            newPrice.push('0')
            return (newPrice.join(''))
        }
    }

    async function EndEdiction(){
        const token = JSON.stringify(localStorage.getItem('token'))

        if (token !== undefined && id ){

            console.log( nameEdit, descriptionEdit, priceEdit, stockEdit, id)

            await api.patch(`/api/products/update-product/${id}`, {
                name: nameEdit, description: descriptionEdit ,price: priceEdit, stock: stockEdit
            },{
                headers: {
                    'Authorization': `Bearer ${token.replaceAll('"', '')}`
                }
            })

            setEndEdite(true);

            setTimeout(()=>{
                CloseModal();

                setEndEdite(false);
            }, 3000)

        }
    }

    async function DeleteProduct(){
        const token = JSON.stringify(localStorage.getItem('token'))

        if (token !== undefined){
            await api.delete(`/api/products/delete-product/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token.replaceAll('"', '')}`
                }
            })

            setEndDelete(true);

            setTimeout(()=>{
                CloseModal();

                setEndDelete(false);
            }, 3000)
        }
    }



    return (
        <div className="fixed top-0 h-full w-full flex items-center justify-center bg-primaryColor bg-opacity-80">
            <div className="relative w-[90%] max-w-[400px] h-[500px] bg-secundaryColor rounded-lg flex flex-col items-center p-5 gap-8">

                <div onClick={CloseModal} className="absolute right-4 top-4 text-primaryColor">
                    <CgClose></CgClose>
                </div>


                {edit === false ? 
                    <div className="text-primaryColor text-2xl text-center">{name}</div> 
                :
                <Input>
                    <p className="text-lg text-primaryColor">NOME</p>
                    <input value={nameEdit} onChange={(e) => setNameEdit(e.currentTarget.value)}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="text" maxLength={35} placeholder="Nome do produto" />
                </Input>
                }

                {edit === false ? 
                    <div className="w-3/5 h-[200px] bg-primaryColor rounded-lg text-center flex items-center justify-center">
                    IMAGEM
                </div>
                :
                <Input>
                    <p className="text-lg text-primaryColor">DESCRIÇÃO</p>
                    <input value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.currentTarget.value)}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="text" maxLength={40} placeholder="Descrição do produto" />
                </Input> 
                }
        
                {edit === false ? 
                    <p className="text-primaryColor text-lg">{description}</p>
                :               
                <Input>
                    <p className="text-lg text-primaryColor">PREÇO</p>
                    
                    <input value={priceEdit} onChange={(e) => setPriceEdit(parseFloat(e.currentTarget.value))}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="number" placeholder="Preço do produto" />
                </Input>
                }

                {edit === false ? 
                    <p className="text-primaryColor text-lg">R$: {ChangePrice(price ? price : 0)}</p>
                :
                <Input>
                    <p className="text-lg text-primaryColor">ESTOQUE</p>
                    <input value={stockEdit} onChange={(e) => setStockEdit(parseInt(e.currentTarget.value))}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="number" placeholder="Nome do produto" />
                </Input>
                }

                <div className="flex items-center justify-center gap-5">
                    
                {edit === false ? 
                    <Button onClick={OpenEdit}>
                        ALTERAR
                    </Button>
                :
                    <Button onClick={EndEdiction}>
                        CONCLUIR ALTERAÇÃO
                    </Button>
                }

                {edit === false ? 
                    <Button onClick={DeleteProduct}>
                        EXCLUIR
                    </Button>
                :
                    <Button onClick={CloseEdit}>
                        VOLTAR
                    </Button>
                }
                </div>

                {endDelete && (
                <div className="absolute top-0 w-[100%] h-[100%] bg-secundaryColor rounded-lg flex flex-col items-center justify-center p-5 gap-8">
                    <h1 className="text-3xl text-primaryColor text-center">PRODUTO EXCLUIDO! </h1>
                </div>
                )}

                {endEdite && (
                <div className="absolute top-0 w-[100%] h-[100%] bg-secundaryColor rounded-lg flex flex-col items-center justify-center p-5 gap-8">
                    <h1 className="text-3xl text-primaryColor text-center">PRODUTO ALTERADO COM SUCESSO! </h1>
                </div>
                )}

            </div>

            
        </div>  
    )
}