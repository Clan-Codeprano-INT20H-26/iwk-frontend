import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

const Home = () => {
  return (
    <>
      <Typography variant="h4">Instant Wellness Kits</Typography>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
