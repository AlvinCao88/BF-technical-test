import { useMutation } from '@tanstack/react-query';

type LoginInput = {
  email: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginInput) => {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        // credentials: 'include', // only if your API uses cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return response.json(); 
    },
  });
};
