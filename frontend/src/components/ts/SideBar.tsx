
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import {SideBarInterface} from './SideBarInterface';
import { useAuth0 } from '@auth0/auth0-react';
import '../scss/NavBar.scss'
const Nav = styled.div`
  background: #15171c;
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;



const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: calc(100vh - 5rem );
  display: flex;
  justify-content: center;
  position: absolute;
  top: 5rem;
  left: 0;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {

  const {user} = useAuth0();
  return (
    <>
      <IconContext.Provider  value={{ color: '#fff' }}>
        <Nav className='navbar'>
          <div className='icon-container'>
            <img src='/clinica_logo2.png' width={70}/>
          </div>
            <h1 className='title'>Clinica</h1>
          <div className='profile-container'>
            <img src={user!.picture} alt={user!.name} />
          </div>
        </Nav>
        <SidebarNav >
          <SidebarWrap>
            {SidebarData.map((item, index:number) => {
              return <SubMenu item={item as SideBarInterface} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;