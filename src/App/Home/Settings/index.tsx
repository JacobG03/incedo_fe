import UploadAvatar from './UploadAvatar'
import { useEffect, useState } from 'react'
import Logout from './Logout'
import UpdateUsername from './UpdateUsername'
import styled from 'styled-components'
import { ReactComponent as AccountSVG } from '../../../assets/svg/user-edit.svg'
import { ReactComponent as AppearanceSVG } from '../../../assets/svg/brush-2.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import UpdateEmail from './UpdateEmail'
import axios from '../../../services/index'
import Theme from './Theme'
import { ITheme } from '../../../types'


const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px - 15vh);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 1rem;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  ::-webkit-scrollbar {
  display: none;
}
`

const Section = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${p => p.theme.bg};
  filter: var(--shadow);
  border-radius: var(--border-radius2);
`

const Title = styled.a`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 1rem 0;
  align-items: center;
  gap: 1rem;
  color: ${p => p.theme.sub};
  font-weight: 700;

  & > span {
    font-size: 1.5rem;
  }
`

const Content = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0,0,0,0.2);
  border-radius: var(--border-radius);
  padding: 1rem;
  gap: 2rem;
`

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
`

const Left = styled.div`
  flex-grow: 1;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Right = styled.div`
  flex-grow: 1;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`


const Settings = () => {
  useEffect(() => {
    document.title = 'Settings | Incedo'
  }, [])

  return (
    <Container>
      <AnchorLink offset={() => 100} href='#account' style={{ display: 'none' }}></AnchorLink>
      <AnchorLink offset={() => 100} href='#appearance' style={{ display: 'none' }}></AnchorLink>
      <Account />
      <Appearance />
    </Container>
  )
}

const Account = () => {
  return (
    <Section id='account'>
      <Title>
        <AccountSVG width={32} height={32} />
        <span>Account</span>
      </Title>
      <Content>
        <Wrap>
          <Left>
            <UpdateUsername />
            <UpdateEmail />
          </Left>
          <Right>
            <UploadAvatar />
          </Right>
        </Wrap>
        <Logout />
      </Content>
    </Section>
  )
}

const Themes = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(100px, 1fr) );
  grid-template-rows: auto;
  grid-gap: 1rem;
`

const Appearance = () => {
  const [themes, setThemes] = useState<ITheme[]>([])

  useEffect(() => {
    axios.get('/settings/themes')
      .then(res => {
        setThemes(res.data)
      })
      .catch()
  }, [])

  return (
    <Section id='appearance'>
      <Title>
        <AppearanceSVG width={32} height={32} />
        <span>Appearance</span>
      </Title>
      <Content>
        <Themes>
          {themes.map(theme => <Theme data={theme} key={theme.id} />)}
        </Themes>
      </Content>
    </Section>
  )
}

export default Settings;
