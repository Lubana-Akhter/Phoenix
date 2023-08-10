import toast, { Toaster } from 'react-hot-toast';
let EmailRegx = /\S+@\S+\.\S+/;
//let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {

    IsEmpty(value) {
        return value.length === 0;
    }

    IsEmail(value) {
        return !EmailRegx.test(value);
    }

    ErrorToast(msg) {
        toast.error(msg, { position: "top-right", duration: 3000, });
    }
    SuccessToast(msg) {
        toast.success(msg, { position: "top-right", duration: 3000, });
    }
    removeSessions = () => {
        localStorage.clear();
        window.location.href = "/login"
    }

}
<Toaster />
export const {
    IsEmpty,
    IsEmail,
    ErrorToast,
    SuccessToast,
    removeSessions
} = new FormHelper();