import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as Info } from '../assets/svg/info-circle.svg';

const Message = styled.div`
  color: ${props => props.theme.error};
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  padding: 0.25rem;
  border-radius: var(--border-radius);
  background-color: ${props => props.theme.bg};
  filter: var(--shadow);
`

const FormError = ({ error, id }: { error: any, id: string }) => (
  <AnimatePresence>
    {error && (
      <Message
        key={id}
        as={motion.div}
        transition={{ duration: 0.4 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <Info style={{ position: 'absolute', left: 8 }} />
        <span>{error.message}</span>
      </Message>
    )}
  </AnimatePresence>
)

export default FormError;