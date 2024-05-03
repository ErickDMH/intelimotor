import { Box } from '@mui/material'
import PropTypes from "prop-types"

/**
 * Form to handle the publication creation.
 * @param {object} publication must be object containing three properties: price, description and imageBase64.
 */
export const Publication = (props) => {
  const { publication } = props

    return (
        <Box display="flex" flexDirection={"column"} p={2} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
            <h2>Publication created successfully!</h2>
            <p>Price: {publication.price}</p>
            <p>Description: {publication.description}</p>
            <img
                style={{ width: "100%" }}
                src={`data:image/jpeg;base64,${publication.imageBase64}`}
            />
        </Box>
    )
}

Publication.propTypes = {
  publication: PropTypes.object.isRequired,
};

export default Publication