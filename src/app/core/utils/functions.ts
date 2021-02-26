export function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((x) => {
        return '%' + ('00' + x.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function clearForm(form: any) {
    for (const control in form.controls) {
        if (form.controls.hasOwnProperty(control)) {
            form.controls[control].reset();
            form.controls[control].setErrors(null);
            form.controls[control].markAsUntouched();
        }
    }

    form.reset();
}

