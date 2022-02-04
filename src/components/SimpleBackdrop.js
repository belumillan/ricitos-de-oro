import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

const SimpleBackdrop = ({isProcessing, customText}) => {

    return (
        <Backdrop
            sx={{ color: '#B2B2B2', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isProcessing}
        >
            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <Stack sx={{ color: 'grey.500' }} spacing={2}>
                    <CircularProgress color="warning" size={100} sx={{ ml: 10 }} />
                    <Typography variant="h4" gutterBottom align='center' sx={{ color: 'black', fontWeight: 'bold' }}>
                        {customText}
                    </Typography>
                </Stack>
            </Box>
        </Backdrop>
    )


}

export default SimpleBackdrop