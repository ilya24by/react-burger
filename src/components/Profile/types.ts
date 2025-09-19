export type EditProfileFormProps = {
    user: {
        name: string;
        email: string;
    };
}

export type EditProfileFormState = {
    name: string;
    email: string;
    password: string;
}