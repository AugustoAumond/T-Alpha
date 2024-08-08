import { useEffect, useState } from "react"
import { ObjectProps } from "../../Interfaces/Interfaces";
import EditModal from "./modal/editItemModal"
import { api } from "../../../materials/axios/axios";
import CreateNewProductModal from "./modal/createNewProduct";
import Button from "../../../materials/button/button";
import Card from "./card/card";
import { HiSearch } from "react-icons/hi";

export default function MainPage(){
    const [object, setObject] = useState<ObjectProps[]>()
    const [ObjectEdit, setObjectEdit] = useState<ObjectProps>();
    const [viewMoreModal, setViewMoreModal] = useState(false)
    const [createNewProductModal, setCreateNewProduct] = useState(false)
    const [search, setSearch] = useState<string>('')

    const token = JSON.stringify(localStorage.getItem('token'))

    useEffect(()=>{
        var searchItems: ObjectProps[] = [];

        if (token !== null){
            api.get('/api/products/get-all-products',{
                headers: {
                    'Authorization': `Bearer ${token.replaceAll('"', '')}`
                }
            })
            .then((e:any)=>{
                if (search){
                    e.data.data.products?.forEach((e: ObjectProps)=>{
                        if (e.name){
                            if (e.name.toUpperCase().includes(search.toLocaleUpperCase()) === true){
                                searchItems.push(e);
                            }
                        }
                        setObject(searchItems)
                    }
                )} else {
                    setObject(e.data.data.products)
                }
            })
        }

    },[token, viewMoreModal, createNewProductModal, search])

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
            <header className="w-full h-40 sm:h-20 bg-terciaryColor flex justify-center">
                <nav className="w-full max-w-[900px] flex items-center justify-between gap-4 p-4 flex-col sm:flex-row">
                    <h1 className="text-center  text-primaryColor">OS MELHORES PRODUTOS <br/>VOCÊ ENCONTRA AQUI</h1>

                    <div className="w-4/5 flex flex-1 gap-2 items-center text-primaryColor ">
                        <input value={search} onChange={(e) => setSearch(e.currentTarget.value)} type="text" className="rounded-lg text-sm sm:text-lg gap-2 flex flex-1 p-1 px-2 space-x-2 text-right text-black"></input>
                        <HiSearch className="size-6"></HiSearch>
                    </div>

                </nav>
            </header>

            <main className="max-w-[900px] w-4/5 f-[1000px] flex flex-col flex-1 bg-terciaryColor p-10 gap-20 rounded-lg">
                <h1 className="text-4xl text-primaryColor text-center">CONFIRA NOSSOS PRODUTOS</h1>

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