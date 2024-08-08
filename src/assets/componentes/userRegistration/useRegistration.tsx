import { useEffect, useState } from "react";
import { api } from "../../../materials/axios/axios";
import { CleanForms} from "./cleanForms";

import CreateNewUserModal from "./modals/createNewUserModal";
import LoginUserModal from "./modals/loginUserModal";

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
    const [lock, setLock] = useState(true)
    const [end, setEnd] = useState(false)

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

        if (phone === undefined){
            return (setError('Telfone inválido!'))
            }else {
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

            setEnd(true);

            setTimeout(()=>{
                setEnd(false);

                setLoginTrue();
            }, 3000)
        }) 
        .catch(function (error) {
            // handle error
            if (error.response.data.message === 'Usuário já cadastrado'){
                setError(error.response.data.message)
            }
        })

        setTimeout(()=>{
            localStorage.removeItem('token')    
        }, 1800000)
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

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    return (
        <div className="bg-primaryColor flex w-full items-center justify-center p-18"> 
            {login === true ?
                <LoginUserModal
                LoginUser={LoginUser}
                error={error}
                lock={lock}
                login={login}
                password={password}
                setLock={setLock}
                setLoginFalse={setLoginFalse}
                setLoginTrue={setLoginTrue}
                setPassword={setPassword}
                setTaxNumber={setTaxNumber}
                taxNumber={taxNumber}
                />
            :
                <CreateNewUserModal
                CreateUser={CreateUser}
                error={error}
                lock={lock}
                setLock={setLock}
                setLoginFalse={setLoginFalse}
                setLoginTrue={setLoginTrue}
                setPassword={setPassword}
                setTaxNumber={setTaxNumber}
                mail={mail}
                name={name}
                password={password}
                phone={phone}
                taxNumber={taxNumber}
                setName={setName}
                setMail={setMail}
                setPhone={setPhone}
                end={end}
                />
            }

        </div>
    )
}