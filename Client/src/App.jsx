import { useCallback, useState } from'react'
import { Box, Paper, CircularProgress, Button } from '@mui/material'
import { PublicationForm, Publication } from './components'
import axios from './utils/axios'

function App() {
	const [loading, setLoading] = useState(false)
	const [publication, setPublication] = useState(null)

	const handleSubmit = async (values) => {
		setLoading(true)
		await axios.post('http://localhost:4500/publication', JSON.stringify(values))
			.then(res => { 
				setLoading(false)
				setPublication(res.data)
			}).catch(err => {
				console.error("Error creating publication: ", err)
			})
			
	}
	
	const renderPublication = useCallback(() => {
		if(loading) {
			return (
				<Box display="flex" justifyContent="center" alignItems="center" paddingY={4} sx={{height: '40vh'}}>
					<CircularProgress size={160} />
				</Box>
			)
		}
		if(publication) {
			return (<>
				<Publication publication={publication} />
				<Button variant="contained" onClick={() => setPublication(null)}
					sx={{width: '40%', marginLeft: 'auto', marginTop: '1.4rem',fontSize: '1rem'}}>
						Create another publication
				</Button>
			</>)
		}
		return (<>
			<h2>Lets create a publication for an automobile Acura ILX Sedán 2018.</h2>
			<PublicationForm onSubmit={handleSubmit} />
		</>)
	}, [publication, loading])

	return (
	<Box display="flex" alignItems="center" justifyContent="center" sx={{height: '100vh', width: '100vw'}}>
		<Paper elevation={3} sx={{width: '60%'}}  p={2} >
			<Box display="flex" flexDirection={'column'} p={2}>
				<Box display="flex" flexDirection={'row'} gap={2} alignItems={'center'}>
					<h1>Intelmotor</h1>
					<h4>Web scraping fullstack test</h4>
				</Box>
				{ renderPublication() }
			</Box>
		</Paper>
	</Box>)
}

export default App
