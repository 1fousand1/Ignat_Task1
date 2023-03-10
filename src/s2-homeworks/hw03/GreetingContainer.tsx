import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'
import user from "../hw08/User";

type GreetingContainerPropsType = {
    users: UserType[] // need to fix any+
    addUserCallback: (name: string) => void // need to fix any+
}

export const pureAddUser = (name: string, setError: (name:string) => void, setName: (name:string) => void, addUserCallback: (name: string) => void) => {
    // если имя пустое - показать ошибку: setError('Ошибка! Введите имя!'),
    if (name.trim() === '') {
        setError('Ошибка! Введите имя!')
    }
    else {
        addUserCallback(name)
        setName('')
    }
    // иначе - добавить юзера при помощи addUserCallback и очистить инпут засетав ''
    // проверить на пустоту можно при помощи метода trim(). К примеру: name.trim() !== ''
    // ЕСЛИ НЕ БУДЕТ ПОЛУЧАТЬСЯ, НЕ РАССТРАИВАЙСЯ. НА ЧЕТВЕРТОМ ЗАНЯТИИ ПО ТУДУЛИСТУ НАУЧИМ), НО ВСЕ ТАКИ ПОПЫТАЙСЯ))
}

export const pureOnBlur = (name: string, setError: (name:string) => void) => (name.trim() === "") && setError('Ошибка! Введите имя!')


export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: ()=>void) => e.key === "Enter" && addUser()


// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any+
    const [error, setError] = useState<string>('') // need to fix any+

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any+
        setName(e.currentTarget.value) // need to fix+

        error && setError('')
    }
    const addUser = () => {


        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {

        pureOnBlur(name, setError)
    }

    const onEnter = (e: any) => {

        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length
    const lastUserName = totalUsers >0? users[users.length -1].name : name ;
    console.log(lastUserName)



    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
