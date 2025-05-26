import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useTodosList } from "../../domain/todos/hooks/useTodosList";
import { useTodoDelete } from "../../domain/todos/hooks/useTodoDelete";
import { useTodoCreate } from "../../domain/todos/hooks/useTodoCreate";
import { useAuth } from '../contexts/useAuth';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user, token, logout } = useAuth();
  const { data: todos, isLoading } = useTodosList(token || "", user || "");
  const { mutate: deleteTodo, isPending: isDeleting } = useTodoDelete();
  const { mutate: createTodo } = useTodoCreate();


  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    createTodo(
      { title, description, token: token || "" },
      {
        onSuccess: () => {
          toast.success("Todo created successfully");
          setOpen(false);
          setTitle("");
          setDescription("");
        },
        onError: (err: Error) => {
          toast.error(err.message || "Failed to create todo");
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!token) {
      toast.error("Authorization required");
      return;
    }
    deleteTodo({ id, token });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Create New Todo
        </Button>
        {user && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              logout();
              navigate("/");
            }}
            sx={{ marginLeft: 2 }}
          >
            Logout
          </Button>
        )}
      </Box>

      {/* Create Todo Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Todo</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreate} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Todo Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No todos found. Create one to get started!
                </TableCell>
              </TableRow>
            ) : (
              todos?.map((todo) => (
                <TableRow key={todo._id}>
                  <TableCell>
                    {todo.title}
                    <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                      <strong>Description:</strong> {todo.description}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(todo._id);
                      }}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Completed"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
