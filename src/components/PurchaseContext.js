import { createContext, useContext, useState } from "react";

const purchaseContext = createContext()

export const { Provider } = purchaseContext

export const usePurchaseContext = () => {
    return useContext(purchaseContext)
}

const PurchaseProvider = ({ children }) => {

    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = (key, e, sanitizeFn) => {

        const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value
        setData({
            ...data,
            [key]: value,
        });
    }

    const handleSubmit = (fData, validations) => {

        if (validations) {

            let valid = true
            const newErrors = {}

            validations.forEach((v, index) => {

                const value = fData[v.key]
                const validation = v.value

                if (validation?.required?.value && !value) {
                    valid = false
                    newErrors[v.key] = validation?.required?.message
                }

                const pattern = validation?.pattern
                if (pattern?.value && !RegExp(pattern.value).test(value)) {
                    valid = false
                    newErrors[v.key] = pattern.message
                }

                const custom = validation?.custom
                if (custom?.isValid && !custom.isValid(value)) {
                    valid = false
                    newErrors[v.key] = custom.message
                }

            })
            if (!valid) {
                setErrors(newErrors)
                return valid
            }
        }

        setErrors({})
        return true

    }


    const contextValue = {
        handleSubmit,
        handleChange,
        data,
        errors
    }

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    )

}

export default PurchaseProvider