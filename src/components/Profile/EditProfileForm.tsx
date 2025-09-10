import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

const EditProfileForm = () => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setName(e.target.value)}
                icon={'EditIcon'}
                value={name}
                name={'name'}
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
                extraClass="mb-4"
            />
            <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={e => setLogin(e.target.value)}
                icon={'EditIcon'}
                value={login}
                name={'login'}
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
                extraClass="mb-4"
            />
            <Input
                type={'text'}
                placeholder={'Пароль'}
                onChange={e => setPassword(e.target.value)}
                icon={'EditIcon'}
                value={password}
                name={'password'}
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            />
        </div>
    );
};

export default EditProfileForm;