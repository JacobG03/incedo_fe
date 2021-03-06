import styled from "styled-components";
import axios from '../../../services/index'
import { ReactComponent as CreateNoteSVG } from '../../../assets/svg/note-add.svg'
import { ReactComponent as CreateSectionSVG } from '../../../assets/svg/folder-add.svg'
import { motion } from "framer-motion";
import { Button } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { IState, INote, ISection } from "../../../types";
import { createSection } from "../../../redux/calls/sections_calls";
import { useEffect, useRef } from "react";
import { Content } from "../../../shared/styles";
import { addNoteSuccess } from '../../../redux/slices/notesSlice'
import { addAlert } from "../../../redux/slices/alertsSlice";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0.5rem;
  color: ${p => p.theme.sub};
  outline: none;
  background-color: ${p => p.theme.bg};
  border-radius: var(--border-radius);
`

const Button2 = styled(Button)`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 200px;
  padding: 0.5rem;
`

const Content2 = styled(Content)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem;
  gap: 0.5rem;
`

interface Props {
  selected: boolean,
  parent_id: number | null
}

const Create = (props: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const notes = useSelector<IState, INote[]>(state => state.notes.notes)
  const sections = useSelector<IState, ISection[]>(state => state.sections.sections)

  const handleNote = (e: any) => {
    e.target.blur()
    axios.post('/notes', { title: notes.length, parent_id: props.parent_id })
      .then(res => {
        dispatch(addNoteSuccess(res.data))
        dispatch(addAlert({message: 'Note created.'}))
        navigate(`/notes/${res.data.id}`)
      })
      .catch(null)
  }

  const handleSection = (e: any) => {
    e.target.blur()
    createSection(dispatch, { name: `Section ${sections.length}`, parent_id: props.parent_id })
  }

  const keyDownHandler = (e: any) => {
    // only execute if tab is pressed
    if (e.key !== 'Tab') return

    // here we query all focusable elements, customize as your own need
    if (containerRef.current) {
      const focusableModalElements = containerRef.current.querySelectorAll(
        'button'
      )

      const firstElement = focusableModalElements[0]
      const lastElement = focusableModalElements[focusableModalElements.length - 1]

      // if going forward by pressing tab and lastElement is active shift focus to first focusable element 
      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        return e.preventDefault()
      }

      // if going backward by pressing tab and firstElement is active shift focus to last focusable element 
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    }
  }

  useEffect(() => {
    containerRef.current?.addEventListener('keydown', keyDownHandler)

    if (containerRef.current && props.selected) {
      // scroll into view
      containerRef.current.tabIndex = -1
      let buttons = containerRef.current.querySelectorAll('button')
      buttons[0].focus()
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [containerRef, props.selected])

  return (
    <Container ref={containerRef}>
      <Content2>
        <Button2
          onClick={(e: any) => handleNote(e)}
          as={motion.button}
          whileHover={{ scale: 1.05, cursor: 'pointer', zIndex: 5 }}
          whileTap={{ scale: 0.95 }}
          name='Create Note'>
          <CreateNoteSVG width={32} height={32} />
          <span>Create Note</span>
        </Button2>
        <Button2
          onClick={(e: any) => handleSection(e)}
          as={motion.button}
          whileHover={{ scale: 1.05, cursor: 'pointer', zIndex: 5 }}
          whileTap={{ scale: 0.95 }}
          name='Create Section'>
          <CreateSectionSVG width={32} height={32} />
          <span>Create Section</span>
        </Button2>
      </Content2>
    </Container>
  )
}

export default Create;
