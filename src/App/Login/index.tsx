import LoginForm from "./LoginForm";
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Wrapper from "../../shared/Wrapper";
import Alerts from "../../shared/Alerts";
import SendPassReset from "./SendPassReset";
import { ReactComponent as MailSVG } from '../../assets/svg/send-2.svg';
import { ReactComponent as UserSVG } from '../../assets/svg/user-add.svg';
import { Content, Cover, FixedContainer, Option, Options, Title } from "../../shared/styles";


const Login = () => {
	const [redirect, setRedirect] = useState(false)
	const [reset, setReset] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		document.title = 'Login | Incedo'
	}, [])

	// Provides current redirect value inside on setTimeout
	// This allows user to cancel redirection
	const redirectRef = useRef(redirect);
	redirectRef.current = redirect;

	const handleRedirect = () => {
		setRedirect(!redirect)
		setTimeout(() => {
			if (redirectRef.current) {
				navigate('/register')
			}
		}, 600)
	}

	return (
		<FixedContainer>
			<Wrapper width={480}>
				<AnimatePresence>
					{!redirect && (
						<Content>
							<Cover
								as={motion.div}
								key={'login-cover'}
								transition= {{ duration: 0.6 }}
								animate={{ y: "-76px", height: '60px' }}
								exit={{ y: "0px", height: '100%' }}
							>
								<Title>Incedo</Title>
							</Cover>
							<LoginForm />
							<span>or</span>
							<Options >
								{reset
									? <SendPassReset setReset={setReset} />
									: <Option
										onClick={() => setReset(!reset)}
										as={motion.div}
										whileHover={{ cursor: 'pointer' }}
										whileTap={{ scale: 0.9 }}
									>
										<MailSVG width={24} height={24} style={{ minWidth: '24px' }} />
										<span style={{ textAlign: 'center' }}>Reset Password</span>
									</Option>
								}
								<Option
									onClick={() => handleRedirect()}
									as={motion.div}
									whileHover={{ cursor: 'pointer' }}
									whileTap={{ scale: 0.9 }}
								>
									<UserSVG width={24} height={24} />
									<span>Register</span>
								</Option>
							</Options>
						</Content>
					)}
				</AnimatePresence>
				<Alerts />
			</Wrapper>
		</FixedContainer>
	)
}

export default Login;
