export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const validateStrongPassword = (password: string): boolean => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+={}[\]:;"'<>,.|/~`\\])[A-Za-z\d@$!%*?&#^()_\-+={}[\]:;"'<>,.|/~`\\]{8,}$/;
  return regex.test(password);
};

export const validateNotEmpty = (value: string): boolean => {
  return value?.trim().length > 0;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};
