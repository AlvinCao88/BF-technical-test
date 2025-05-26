import { useMutation, useQueryClient } from '@tanstack/react-query';

type CreateTodoInput = {
  title: string;
  description?: string;
  token: string;
};

export const useTodoCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description, token }: CreateTodoInput) => {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create todo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
