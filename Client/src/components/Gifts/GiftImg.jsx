import React, { useState } from "react";
import { Dialog, DialogContent, Grid, Card, CardMedia } from "@mui/material";

const GiftImg = ({ imgUrl }) => {

    const [openImg, setOpenImg] = useState(false);

    return (
        <>
            {imgUrl && <Grid item xs={12} md={12}>
                <Card sx={{ width: '40%' }}>
                    <CardMedia
                        component="img"
                        height="auto"
                        image={imgUrl}
                        alt="תמונה"
                        onClick={() => { setOpenImg(true) }}
                    />
                </Card>
            </Grid>}
            <Dialog
                open={openImg}
                onClose={() => { setOpenImg(false) }}
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <img
                        src={imgUrl}
                        alt="תמונה מוגדלת"
                        style={{ width: '100%' }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GiftImg;