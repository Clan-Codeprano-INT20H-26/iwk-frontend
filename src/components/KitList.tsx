import type { Kit } from '@/types/kit';
import { KitCard } from './KitCard';
import Grid from '@mui/material/Grid';

interface KitListProps {
  kits: Kit[];
}
export const KitList = ({ kits }: KitListProps) => {
  return (
    <Grid container spacing={5}>
      {kits.map((kit) => (
        <Grid size={{ md: 4, lg: 4, xl: 3, xxl: 2 }} key={kit.id}>
          <KitCard {...kit} />
        </Grid>
      ))}
    </Grid>
  );
};
