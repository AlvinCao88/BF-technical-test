import { useQuery } from '@tanstack/react-query';
import { TodosDto } from '../dto/todos-dto';

export const useTodosList = (token: string, userId: string | undefined) => {
  return useQuery({
    queryKey: ['todos', userId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch todos');
      }

      const data: TodosDto[] = await response.json();
      return data;
    },
    enabled: !!token && !!userId,
  });
};
