import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { formatPrice } from '@/lib/utils/formatPrice';
import { useNavigate } from '@tanstack/react-router';
import type { Kit } from '@/types/kit';

type KitCardProps = Omit<Kit, 'description'>;

export const KitCard = ({ id, name, price, seller, images }: KitCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: '350px' }}>
      <CardActionArea
        disableRipple
        disableTouchRipple
        onClick={() => navigate({ to: `/kits/${id}`, params: { kitId: id } })}
      >
        <CardMedia component="img" height={350} alt={name} image={images[0]} />
        <CardContent>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {seller}
          </Typography>
          <Typography color="primary.main" variant="subtitle2">
            {formatPrice(price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
