import { useNavigate } from '@tanstack/react-router';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { formatPrice } from '@/lib/utils/formatPrice';
import { useWishlist } from '@/lib/hooks/useWishlist';

interface WishCardProps{
    id:string,
    image: string, 
    name: string,
    price: number
}
export const WishCard = ({id, image, name, price}: WishCardProps) => {
  const navigate = useNavigate()
  const {removeWish} = useWishlist()
    return(
        <Card  sx={{width:'320px', borderRadius:0, border:'none', position:'relative', boxShadow:'none'}}>
          <CardActionArea sx={{position:'relative'}}
                disableRipple
                disableTouchRipple
                onClick={() => navigate({ to: `/kits/${id}`, params: { kitId: id } })}
            >
            <CardMedia component="img" image={image} alt={name}  sx={{height:'380px'}}/>
            <CardContent sx={{display:'flex',flexDirection:'row', justifyContent:'space-between', padding:"20px 0 30px 0"}}>
              <Typography variant="subtitle1">
                {name}
              </Typography>
              <Typography variant="subtitle1" color='primary.main'>
                {formatPrice(price)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button onClick={()=> removeWish(id)} sx={{backgroundColor:'rgba(255, 255, 255, 0.24)', minWidth:'fit-content', borderRadius:'12px', position:'absolute', top:'20px', right:'20px',}}>
                <img src="/remove-favourite.png" width={20} height={20} alt="Remove favourite" />
          </Button>
        </Card>
    )
}