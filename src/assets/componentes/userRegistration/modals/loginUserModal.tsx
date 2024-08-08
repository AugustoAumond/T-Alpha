import { FaIdCard, FaLock, FaLockOpen } from "react-icons/fa";
import Input from "../../../../materials/input/input";
import { IMaskInput } from "react-imask";
import Button from "../../../../materials/button/button";
import { CreatUserProps } from "../../../Interfaces/Interfaces";

interface LoginUserProps extends CreatUserProps {
    setLoginTrue: () => void
    setLoginFalse: () => void
    login: boolean
    setTaxNumber: (e: string) => void
    setPassword: (e: string) => void
    setLock: (e: boolean) => void
    error: string
    LoginUser: () => void
    lock: boolean
}

export default function LoginUserModal({
    LoginUser, 
    error,
    login,
    password,
    setLock,
    setLoginFalse,
    setLoginTrue,
    setPassword,
    setTaxNumber,
    taxNumber,
    lock

    }:LoginUserProps){
    return(
        <main className="w-[90%] h-full max-w-[500px] max-h-[500px] md:max-h-[500px] bg-terciaryColor rounded-lg p-6  flex flex-col items-center gap-8">
            <p className="text-2xl text-primaryColor">
                FAÇA SEU LOGIN                
            </p>
            
            <div className="flex w-full items-center justify-center gap-4">
                <div className="flex w-full items-center justify-center gap-6">
                    <button onClick={setLoginTrue} className="text-sm  sm:text-lg text-primaryColor">
                        <strong>
                            SIGN IN
                        </strong>

                        {login === true && <div className="border-b-2 border-primaryColor"></div>}
                    </button>

                    <button onClick={setLoginFalse} className="text-sm  sm:text-lg text-primaryColor">
                        SIGN UP
                    </button>
                </div>
            </div>


            <div className="flex flex-col w-full gap-4">
                <Input>
                    <p className="text-sm  sm:text-lg text-primaryColor">CPF</p>
                    <div className="text-sm  sm:text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex gap-2 items-center">
                        <FaIdCard className="text-terciaryColor"></FaIdCard>
                        <IMaskInput value={taxNumber}  onChange={(e) => setTaxNumber(e.currentTarget.value)} mask={'000.000.000-00'}  className="text-sm  sm:text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex flex-1" type="text" maxLength={14} placeholder="000.000.000-00"/> 
                    </div>
                </Input>

                <Input>
                    <p className="text-sm  sm:text-lg text-primaryColor">PASSWORD</p>

                    <div className="text-sm  sm:text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex gap-2 items-center">
                        {lock === true ?  <FaLock onClick={() => setLock(false)} className="text-terciaryColor"></FaLock > : <FaLockOpen onClick={() => setLock(true)} className="text-terciaryColor"></FaLockOpen>}
        
                        <input value={password}  onChange={(e) => setPassword(e.currentTarget.value)} className="text-sm  sm:text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex flex-1" type={lock === true ? 'password' : 'text'} placeholder="Digite sua senha" />
                    </div>
                </Input>
            </div> 

            <div className="flex flex-col gap-2 text-center">
                <p className="text-2xl text-red-900">{error}</p>
            </div>


            <div className="flex w-full items-center justify-center gap-4">
                <div className="flex w-full items-center justify-center gap-4">
                    <Button onClick={() => LoginUser()} >
                        CONFIRMAR
                    </Button>

                    <Button onClick={setLoginFalse}>
                        CRIAR CONTA
                    </Button>
                </div>
            </div>
        </main>
    )
}