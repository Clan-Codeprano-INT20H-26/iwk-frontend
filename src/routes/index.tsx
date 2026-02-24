import { Header } from '@/components/Header';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

const CatalogPage = () => {
  return (
    <>
      <Header currentPage="catalog" />
      <Typography variant="h4">Instant Wellness Kits</Typography>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: CatalogPage,
});
