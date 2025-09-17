import { ChangeEvent, useState } from "react";

function useForm<T extends { [key: string]: string }>(baseForm: T): readonly [
    T,
    (e: ChangeEvent<HTMLInputElement>) => void,
    () => void,
] {
    const [form, setForm] = useState<T>(baseForm);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const element = e.target;
        setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
    }

    function resetForm() {
        setForm(baseForm);
    }

    return [form, handleChange, resetForm] as const;
}

export default useForm;