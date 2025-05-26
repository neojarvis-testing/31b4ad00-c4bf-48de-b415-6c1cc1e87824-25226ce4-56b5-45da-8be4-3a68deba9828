import { useFormik } from "formik";
import * as Yup from 'yup';

export const FormValidations = (initialValues, yupObject, handleSubmit) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(yupObject),
        onSubmit: handleSubmit
    })

    return formik;
}