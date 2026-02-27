import { useNavigate } from '@tanstack/react-router';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { formatPrice } from '@/lib/utils/formatPrice';

interface RecentlyReviewedKitProps{
    id:string,
    image: string, 
    name: string,
    price: number
}


export const RecentlyReviewedKit = ({id, image, name, price}: RecentlyReviewedKitProps) => {
    const navigate = useNavigate()
    return(
        <Card sx={{width:'320px', borderRadius:0, border:'none', position:'relative', boxShadow:'none'}}>
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
        </Card>
    )
}