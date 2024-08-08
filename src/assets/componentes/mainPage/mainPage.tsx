import { useEffect, useState } from "react"
import { ObjectProps } from "../../Interfaces/Interfaces";
import EditModal from "./modal/editItemModal"
import { api } from "../../../materials/axios/axios";
import CreateNewProductModal from "./modal/createNewProduct";
import Button from "../../../materials/button/button";
import Card from "./card/card";

export default function MainPage(){
    const [object, setObject] = useState<ObjectProps[]>()
    const [ObjectEdit, setObjectEdit] = useState<ObjectProps>();
    const [viewMoreModal, setViewMoreModal] = useState(false)
    const [createNewProductModal, setCreateNewProduct] = useState(false)


    useEffect(function (){
        const token = JSON.stringify(localStorage.getItem('token'))

        api.get('/api/products/get-all-products',{
            headers: {
                'Authorization': `Bearer ${token.replaceAll('"', '')}`
            }
        })
        .then((e:any)=>{
            setObject(e.data.data.products)
        })
    },[])

    function OpenViewMore(value: ObjectProps){
        setObjectEdit(value);

        setViewMoreModal(true);
    }   

    function CloseViewMore(){
        setViewMoreModal(false);
    }

    function OpenCreateNewProduct(){
        setCreateNewProduct(true);
    }   

    function CloseCreateNewProduct(){
        setCreateNewProduct(false);
    }


    function ChangePrice(value: number){
        const newPrice = value.toString().split('');
        const cont = newPrice?.length;
        if (cont) {
            newPrice.splice(cont-2, 0,'.');

            return (newPrice.join(''))
        }
    }


    return (
        <div className="bg-primaryColor w-screen flex flex-col items-center gap-20 pb-20">
            <header className="w-full h-20 bg-terciaryColor">
                <nav className="max-w-[1200px]">


                </nav>
            </header>

            <main className="max-w-[900px] w-4/5 f-[1000px] flex flex-col flex-1 bg-terciaryColor p-10 gap-20 rounded-lg">
                <h1 className="text-2xl text-primaryColor text-center">CONFIRA NOSSOS PRODUTOS</h1>

                <div className="w-full flex gap-5 flex-wrap justify-center">

                {object?.map((items: ObjectProps, index: number)=>{
                    return(
                    <Card 
                    key={index}
                    ChangePrice={ChangePrice}
                    OpenViewMore={OpenViewMore}
                    items={items}
                    description={items.description}
                    name={items.name}
                    price={items.price}
                    >

                    </Card>
                )})}
                </div>

                <Button onClick={OpenCreateNewProduct}>
                    CRIAR PRODUTO
                </Button>
            </main>

            {createNewProductModal && (   
                    <CreateNewProductModal
                    CloseCreateNewProduct={CloseCreateNewProduct}/>
                )}
            
            {viewMoreModal && (   
                    <EditModal
                    description={ObjectEdit?.description}
                    name={ObjectEdit?.name}
                    CloseModal={CloseViewMore}
                    price={ObjectEdit?.price}
                    id={ObjectEdit?.id}
                    stock={ObjectEdit?.stock}
                    />
                )}
        </div>
    )
}