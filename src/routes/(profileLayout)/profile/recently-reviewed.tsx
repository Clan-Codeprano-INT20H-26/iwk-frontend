import { createFileRoute } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { RecentlyReviewedKit } from '@/components/RecentlyReviewedKit'
import { useRecentlyReviewed } from '@/lib/hooks/useRecentlyReviewed'

export const Route = createFileRoute('/profile/recently-reviewed')({
  component: RouteComponent,
})

function RouteComponent() {
  const {recentlyReviewed} = useRecentlyReviewed()
  return(
    <>
      <Typography variant="h3" sx={{mb:'70px'}}>
        Recently reviewed
      </Typography>
      <Stack gap={5} flexDirection='row' flexWrap='wrap'>
        {recentlyReviewed.map(({id, name, price, images}, index) => (
          <RecentlyReviewedKit key={index} id={id} name={name} price={price} image={images[0]}/>
        ))}
      </Stack>
    </>
  )
}
