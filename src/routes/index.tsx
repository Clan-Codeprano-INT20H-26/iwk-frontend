import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

const Home = () => {
  return <Typography variant="h3">Hackathon Frontend Template</Typography>;
};

export const Route = createFileRoute('/')({
  component: Home,
});
