// src/domain/todos/hooks/useRegister.ts
import { useMutation } from '@tanstack/react-query';

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ name, email, password }: RegisterInput) => {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      return response.json();
    },
  });
};
