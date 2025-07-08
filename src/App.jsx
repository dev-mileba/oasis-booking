import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StyledApp = styled.div`
	background-color: red;
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Heading>The wild oasis</Heading>
				<Button onClick={() => alert('check in')}>Check in</Button>
				<Button onClick={() => alert('check out')}>Check out</Button>
				<Input type="number" placeholder="Number of guest"></Input>
			</StyledApp>
		</>
	);
}

export default App;
