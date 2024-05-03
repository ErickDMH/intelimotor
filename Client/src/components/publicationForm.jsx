import { Box, TextField, Button } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * Form to handle the publication creation.
 * @param {void} onSubmit must be an function that receives an object with two properties: price and description.
 */
export const PublicationForm = (props) => {
    const { onSubmit } = props

	const handleSubmit = (event) => {
		event.preventDefault()
		const price = event.target.price.value
		const description = event.target.description.value
        onSubmit({ price, description })
	}

    return (
    <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={'column'} gap={2} p={2}>
            <TextField id="price" label="Price" variant="outlined" type="number" required />
            <TextField id="description" label="Description" variant="outlined" multiline rows={4} required />
            <Button variant="contained" sx={{width: '40%', marginLeft: 'auto', fontSize: '1.3rem'}} type='submit'>Create publication</Button>
        </Box>
    </form>
    )
}

PublicationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default PublicationForm