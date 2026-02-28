import type { Order, Status } from '@/types/order';
import type { Kit } from '@/types/kit';
import { formatPrice } from '@/lib/utils/formatPrice';
import { formatPercent } from '@/lib/utils/formatPercent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDate } from '@/lib/utils/formatDate';

const getStatusColor = (status: Status) => {
  switch (status) {
    case 'Successful':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Failed':
      return 'error';
    default:
      return 'default';
  }
};

const renderItemRow = (kit: Kit, quantity: number) => {
  const lineTotal = kit.price * quantity;
  return (
    <Stack
      key={kit.id}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 1.5 }}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: 2,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={kit.images[0]}
            alt={kit.name}
            width={72}
            height={72}
            sx={{ objectFit: 'cover' }}
          />
        </Box>
        <Stack>
          <Typography variant="subtitle1">{kit.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {kit.seller}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Qty: {quantity}
          </Typography>
        </Stack>
      </Stack>
      <Stack alignItems="flex-end" gap={0.5}>
        <Typography variant="subtitle2" color="text.secondary">
          {formatPrice(kit.price)}
        </Typography>
        <Typography variant="subtitle1" color="primary.main">
          {formatPrice(lineTotal)}
        </Typography>
      </Stack>
    </Stack>
  );
};

const renderTaxLine = (label: string, rate: number, subTotal: number) => {
  const amount = subTotal * rate;
  return (
    <Stack
      key={label}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="body2" color="text.secondary">
        {label} ({formatPercent(rate)})
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {formatPrice(amount)}
      </Typography>
    </Stack>
  );
};

export const OrderItem = (order: Order) => {
  const {
    id,
    items,
    status,
    createdAt,
    subTotal,
    taxAmount,
    compositeTaxRate,
    totalAmount,
    taxes,
    latitude,
    longitude,
  } = order;

  const jurisdictions =
    taxes.jurisdictions && taxes.jurisdictions.length > 0
      ? taxes.jurisdictions.join(' • ')
      : 'N/A';

  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: '12px !important',
        overflow: 'hidden',
        '&:before': { display: 'none' },
        border: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: 'background.paper',
          '& .MuiAccordionSummary-content': {
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
          flex={1}
        >
          <Stack gap={0.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Order ID
            </Typography>
            <Typography variant="subtitle1" noWrap>
              {id}
            </Typography>
          </Stack>
          <Stack gap={0.25} sx={{ mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Latitude: <b>{latitude}</b>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Longitude: <b>{longitude}</b>
            </Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography color="text.secondary">
              {formatDate(createdAt)}
            </Typography>
            <Chip
              label={status}
              color={getStatusColor(status)}
              size="small"
              sx={{ textTransform: 'capitalize' }}
            />
            <Typography variant="subtitle1" color="primary.main">
              {formatPrice(totalAmount)}
            </Typography>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, backgroundColor: 'background.paper' }}>
        <Stack gap={2}>
          <Divider />
          <Stack gap={1.5}>
            {items.map((item) => renderItemRow(item.kit, item.quantity))}
          </Stack>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            gap={3}
          >
            <Stack gap={1.5}>
              <Typography variant="subtitle2" color="text.secondary">
                Tax breakdown
              </Typography>
              <Stack gap={0.5}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography color="text.secondary">
                    Total tax ({formatPercent(compositeTaxRate)})
                  </Typography>
                  <Typography color="text.secondary">
                    {formatPrice(taxAmount)}
                  </Typography>
                </Stack>
                {renderTaxLine('State tax', taxes.stateRate, subTotal)}
                {renderTaxLine('County tax', taxes.countyRate, subTotal)}
                {renderTaxLine('City tax', taxes.cityRate, subTotal)}
                {renderTaxLine('Special tax', taxes.specialRates, subTotal)}
              </Stack>
              <Typography variant="caption" color="text.secondary">
                Jurisdictions: {jurisdictions}
              </Typography>
            </Stack>

            <Stack gap={1} sx={{ minWidth: 220 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>{formatPrice(subTotal)}</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography color="text.secondary">Tax</Typography>
                <Typography>{formatPrice(taxAmount)}</Typography>
              </Stack>
              <Divider flexItem />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="subtitle1" color="primary.main">
                  {formatPrice(totalAmount)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
