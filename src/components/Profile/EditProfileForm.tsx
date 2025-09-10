import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

const EditProfileForm = ({ user }: { user: { name: string, email: string } }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
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
                onChange={e => setEmail(e.target.value)}
                icon={'EditIcon'}
                value={email}
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