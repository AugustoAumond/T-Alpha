import { useEffect, useState } from "react";
import { api } from "../../axios/axios";
import { CleanForms} from "./cleanForms";

import {IMaskInput } from "react-imask";

interface token {
    setToken: (e: string) => void;
}

export function UserRegistration({
    setToken
}:token ){
    const [login, setLogin] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [taxNumber, setTaxNumber] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [error, setError] = useState<string>('')

    useEffect(()=>{
        if (taxNumber){
            setTaxNumber(taxNumber.replaceAll('.', '').replace('-', ''))
        }

        if (phone){
            setPhone(phone.replace('(', '').replaceAll(')', '').replaceAll(' ', '').replace('-', ''))
        }

    }, [phone, taxNumber])
    

    function setLoginTrue(){
        setLogin(true);

        CleanForms(setName, setTaxNumber, setPhone, setPassword, setMail, setError) 
    }

    function setLoginFalse(){
        setLogin(false);

        CleanForms(setName, setTaxNumber, setPhone, setPassword, setMail, setError) 
    }

    async function CreateUser(){  
        
        if (name.length < 6){
            return (setError('Digite um nome válido'));
        }

        if (taxNumber === undefined){
            return (setError('CPF incorreto!'));
        } else if (taxNumber?.toString().length < 11){
            return (setError('CPF incorreto!'));
        }

        if (mail?.toString().length < 11 || mail.includes('@') === false){
            return (setError('Digite um Email válido.'));
        }

        if (phone){
            if (phone?.toString().length < 11){
                return (setError('Telfone inválido!'));
            }
        }

        if (password?.toString().length < 6){
            return (setError('Password deve conter no mínimo 6 números!'));
        }
    

        await api.post('/api/auth/register',{
            name, 
            taxNumber,
            mail,
            phone,
            password
        }).then(()=> {
            CleanForms(setName, setTaxNumber, setPhone, setPassword, setMail, setError) 
        }) 
        .catch(function (error) {
            // handle error
            if (error.response.data.message === 'Usuário já cadastrado'){
                setError(error.response.data.message)
            }
        })
    }

    async function LoginUser(){
        setTaxNumber(taxNumber.replaceAll('.', '').replace('-', ''))

        if (taxNumber === undefined){
            return (setError('CPF incorreto!'));
        } else if (taxNumber?.toString().length < 11){
            return (setError('CPF incorreto!'));
        }


        if (password?.toString().length < 6){
            return (setError('Password deve conter no mínimo 6 números!'));
        }
        


        await api.post('/api/auth/login',{
            taxNumber,
            password
        }).then(e =>{
            localStorage.setItem('token',  e.data.data.token.toString())  
            setToken(e.data.data.token.toString())     

            setTimeout(()=>{
                localStorage.removeItem('token')    
            }, 60000 * 15)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    return (
        <div className="bg-primaryColor  w-screen h-screen flex items-center justify-center p-5"> 
            {login === true ?
                <main className="w-full h-full max-w-[500px] max-h-[500px] bg-terciaryColor rounded-lg p-6 flex flex-col items-center gap-8">
                    <p className="text-2xl text-primaryColor">
                        FAÇA SEU LOGIN                
                    </p>
                
                <div className="flex w-full items-center justify-center gap-4">

                    <div className="flex w-full items-center justify-center gap-6">
                        <button onClick={setLoginTrue} className="text-lg text-primaryColor">
                            <strong>
                                SIGN IN
                            </strong>

                            {login === true && <div className="border-b-2 border-primaryColor"></div>}
                        </button>

                        <button onClick={setLoginFalse} className="text-lg text-primaryColor">
                            SIGN UP
                        </button>
                    </div>
                </div>


                <div className="flex flex-col w-full gap-4">
                    <div className="flex flex-col gap-2 ">
                        <p className="text-lg text-primaryColor">CPF</p>
                        <IMaskInput value={taxNumber}  onChange={(e) => setTaxNumber(e.currentTarget.value)} mask={'000.000.000-00'}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="text" maxLength={14} placeholder="Digite seu usuário" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-lg text-primaryColor">PASSWORD</p>
                        <input value={password}  onChange={(e) => setPassword(e.currentTarget.value)} className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="password" placeholder="Digite seu usuário" />
                    </div>
                </div> 

                <div className="flex flex-col gap-2 text-center">
                    <p className="text-2xl text-red-900">{error}</p>
                </div>


                <div className="flex w-full items-center justify-center gap-4">
                    <div className="flex w-full items-center justify-center gap-4">
                        <button onClick={() => LoginUser()} className="border-2 border-primaryColor rounded-lg px-3 py-2 text-primaryColor hover:bg-secundaryColor">
                            CONFIRMAR
                        </button>

                        <button className="border-2 border-primaryColor rounded-lg px-3 py-2 text-primaryColor hover:bg-secundaryColor">
                            CANCELAR
                        </button>
                    </div>
                </div>
            </main> :

            <main className="w-full h-full max-w-[500px] max-h-[800PX] bg-terciaryColor rounded-lg p-6 flex flex-col items-center gap-8">
                <p className="text-2xl text-primaryColor">
                    CRIE SUA CONTA              
                </p>

                <div className="flex w-full items-center justify-center gap-4">

                    <div className="flex w-full items-center justify-center gap-6">
                        <button onClick={setLoginTrue} className="text-lg text-primaryColor">
                            SIGN IN
                        </button>

                        <button onClick={setLoginFalse} className="text-lg text-primaryColor">
                            <strong> SIGN UP </strong>
                            <div className="border-b-2 border-primaryColor"></div>
                        </button>
                    </div>
                </div>


                <div className="flex flex-col w-full gap-4">
                    <div className="flex flex-col gap-2 ">
                        <p className="text-lg text-primaryColor">NOME:</p>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="text" placeholder="Digite seu nome" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-lg text-primaryColor">CPF:</p>
                        <IMaskInput type="text" value={taxNumber} onChange={(e) => setTaxNumber(e.currentTarget.value)}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" maxLength={14} mask={'000.000.000-00'}  placeholder="000.000.000-00" />
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <p className="text-lg text-primaryColor">EMAIL:</p>
                        <input value={mail} onChange={(e) => setMail(e.target.value)} className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="text" placeholder="Digite seu email" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-lg text-primaryColor">TELEFONE:</p>
                        <IMaskInput value={phone} onChange={(e) => setPhone(e.currentTarget.value)}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type="text" maxLength={16} mask={'(00) 0 0000-0000'} placeholder="(00) 0 0000 0000" />
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <p className="text-lg text-primaryColor">PASSWORD:</p>
                        <input value={password} onChange={(e) => setPassword(e.currentTarget.value)}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2" type={"password"} placeholder="Digite seu password" />
                    </div>
                </div> 

                <div className="flex flex-col gap-2 text-center">
                    <p className="text-2xl text-red-900">{error}</p>
                </div>

                <div className="flex w-full items-center justify-center gap-4">
                    <div className="flex w-full items-center justify-center gap-4">
                        <button onClick={CreateUser} className="border-2 border-primaryColor rounded-lg px-3 py-2 text-primaryColor hover:bg-secundaryColor">
                            CRIAR CONTA
                        </button>

                        <button onClick={setLoginTrue} className="border-2 border-primaryColor rounded-lg px-3 py-2 text-primaryColor hover:bg-secundaryColor">
                            VOLTAR
                        </button>
                    </div>
                </div>
            </main> 
            }

        </div>
    )
}