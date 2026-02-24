import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"

export const KitBoxTemplate = () => {
    return(
        <Card sx={{maxWidth: '200px', backgroundColor:'#FFFFF'}}>
            <CardMedia sx={{borderRadius:"10px"}} component="img" width="100%" alt="kit box img" image="/sign-up.png"/>
            <CardContent>
                <Typography sx={{fontSize:'15px'}} variant="h3">Pilates Essentials Kit</Typography>
                <Typography variant="caption">Author: Ruban Alex</Typography>
                <Typography sx={{fontSize:'15px', color: "#3730A3"}}  variant="h3">$198.00</Typography>
            </CardContent>
        </Card>
    )
}