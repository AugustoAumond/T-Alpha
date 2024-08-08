import { FaIdCard, FaLock, FaLockOpen, FaPhone, FaUser } from "react-icons/fa"
import Input from "../../../../materials/input/input"
import { CreatUserProps } from "../../../Interfaces/Interfaces"
import { MdEmail } from "react-icons/md"
import { IMaskInput } from "react-imask"
import Button from "../../../../materials/button/button"

interface CreateNewUserProps extends CreatUserProps{
    setLoginTrue: () => void
    setLoginFalse: () => void
    setName: (e: string) => void
    setTaxNumber: (e: string) => void
    setMail: (e: string) => void
    setPhone: (e: string) => void
    setLock: (e: boolean) => void
    lock: boolean
    CreateUser: () => Promise<void>
    setPassword: (e: string) => void
    error: string
}

export default function CreateNewUserModal({
    CreateUser,
    lock,
    setLock,
    setLoginFalse,
    setLoginTrue,
    setMail,
    setName,
    setPhone,
    setTaxNumber,
    mail,
    name,
    password,
    phone,
    taxNumber,
    setPassword,
    error
    }: CreateNewUserProps) {
    return (
        <main className="w-full h-full max-w-[500px] max-h-[850px] bg-terciaryColor rounded-lg p-6 flex flex-col items-center gap-8">
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
                <Input>
                    <p className="text-lg text-primaryColor">NOME:</p>

                    <div className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex gap-2 items-center">
                        <FaUser className="text-terciaryColor"></FaUser>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex flex-1" type="text" placeholder="Digite seu nome" />
                    </div>
                </Input>

                <Input>
                    <p className="text-lg text-primaryColor">CPF</p>

                    <div className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex gap-2 items-center">
                        <FaIdCard className="text-terciaryColor"></FaIdCard>
                        <IMaskInput value={taxNumber}  onChange={(e) => setTaxNumber(e.currentTarget.value)} mask={'000.000.000-00'}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex flex-1" type="text" maxLength={14} placeholder="000.000.000-00"/> 
                    </div>
                </Input>

                <Input>
                    <p className="text-lg text-primaryColor">EMAIL:</p>

                    <div className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex gap-2 items-center">
                        <MdEmail className="text-terciaryColor"></MdEmail>
                        <input value={mail} onChange={(e) => setMail(e.target.value)} className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex flex-1" type="text" placeholder="Digite seu email" />
                    </div>
                </Input>

                <Input>
                    <p className="text-lg text-primaryColor">TELEFONE:</p>

                    <div className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex gap-2 items-center">
                        <FaPhone className="text-terciaryColor"></FaPhone>
                        <IMaskInput value={phone} onChange={(e) => setPhone(e.currentTarget.value)}  className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex flex-1" type="text" maxLength={16} mask={'(00) 0 0000-0000'} placeholder="(00) 0 0000 0000" />
                    </div>
                </Input>

                <Input>
                    <p className="text-lg text-primaryColor">PASSWORD:</p>

                    <div className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex gap-2 items-center">
                        {lock === true ?  <FaLock onClick={() => setLock(false)} className="text-terciaryColor"></FaLock > : <FaLockOpen onClick={() => setLock(true)} className="text-terciaryColor"></FaLockOpen>}
        
                        <input value={password}  onChange={(e) => setPassword(e.currentTarget.value)} className="text-lg text-black rounded-lg bg-primaryColor p-1 space-x-2 flex flex-1" type={lock === true ? 'password' : 'text'} placeholder="Digite sua senha" />
                    </div>
                </Input>
            </div> 

            <div className="flex flex-col gap-2 text-center">
                <p className="text-2xl text-red-900">{error}</p>
            </div>

            <div className="flex w-full items-center justify-center gap-4">
                <div className="flex w-full items-center justify-center gap-4">
                    <Button onClick={CreateUser}>
                        CRIAR CONTA
                    </Button>

                    <Button onClick={setLoginTrue}>
                        VOLTAR
                    </Button>
                </div>
            </div>
        </main> 
    )
}