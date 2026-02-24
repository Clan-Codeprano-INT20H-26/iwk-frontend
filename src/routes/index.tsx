import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';
import { KitBoxTemplate } from '@/components/KitboxTemplate/KitBoxTemplate';

const Home = () => {
  return (
    <>
      <Typography variant="h4">Instant Wellness Kits</Typography>
      <KitBoxTemplate/>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
