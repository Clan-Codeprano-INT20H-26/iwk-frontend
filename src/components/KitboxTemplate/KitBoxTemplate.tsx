import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import c from "./KitBoxTemplate.module.css"

export const KitBoxTemplate = () => {
    return(
        <Stack direction="column" sx={{width: 'calc((100% - 240px) / 6)'}} gap={2}>
            <img className={c.kit_img} src="/sign-up.png" alt="kit box img" />
            <Typography sx={{fontSize:'15px'}} variant="h3">Pilates Essentials Kit</Typography>
            <p>Author: Ruban Alex</p>
            <Typography sx={{fontSize:'15px'}}  variant="h3">$198.00</Typography>
        </Stack>
    )
}