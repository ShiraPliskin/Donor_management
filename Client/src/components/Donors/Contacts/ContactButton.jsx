
const ContactButton = ({ fields, donorDetails, setDonorDetails, sendRequest, open, handleClose, type }) => {
    return (
        <Button
            fullWidth
            variant="outlined"
            color="info"
            startIcon={<PersonIcon sx={{ marginLeft: 1 }} />}
            onClick={() => { setOpenContactForm(true) }}
        >איש קשר
        </Button>
    )
}
export default ContactButton
