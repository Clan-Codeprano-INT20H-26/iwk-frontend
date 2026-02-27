import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { formatPrice } from '@/lib/utils/formatPrice';
import { useNavigate } from '@tanstack/react-router';
import { useWishlist } from '@/lib/hooks/useWishlist';
import type { Kit } from '@/types/kit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from './ui/IconButton';

export const KitCard = (kit: Kit) => {
  const { id, name, price, seller, images } = kit;

  const navigate = useNavigate();
  const { items, addItem, removeItem } = useWishlist();
  const isInWishlist = items.some((item) => item.id === id);

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      removeItem(id);
    } else {
      addItem(kit);
    }
  };

  return (
    <Card sx={{ maxWidth: '350px', position: 'relative' }}>
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
      <IconButton
        onClick={handleAddToWishlist}
        sx={{ position: 'absolute', top: 10, right: 10 }}
      >
        {isInWishlist ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon sx={{ color: 'grey.400' }} />
        )}
      </IconButton>
    </Card>
  );
};
