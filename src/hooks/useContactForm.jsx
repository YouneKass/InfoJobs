import { useState } from "react";

export function useContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!values.name.trim()) newErrors.name = "Nombre requerido";
    if (!values.email.trim()) newErrors.email = "Email requerido";
    if (!values.message.trim()) newErrors.message = "Mensaje requerido";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setSuccess(true);
    setLoading(false);

    setValues({
      name: "",
      email: "",
      message: ""
    });

    setErrors({});
  };

  return {
    values,
    errors,
    success,
    loading,
    handleChange,
    handleSubmit
  };
}