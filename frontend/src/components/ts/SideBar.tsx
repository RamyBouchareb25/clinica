
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import {SideBarInterface} from './SideBarInterface';
import { useAuth0 } from '@auth0/auth0-react';
import '../scss/NavBar.scss'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Nav = styled.div`
  background: #15171c;
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;



const SidebarNav = styled.nav<{height:string}>`
  background: #15171c;
  width: 250px;
  overflow: hidden;
  display: flex;
  height: ${props => props.height};
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
  const history = useHistory();

  const {user} = useAuth0();

  const [sidebarHeight, setSidebarHeight] = useState('100vh');

  useEffect(() => {
    const handleResize = () => {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      const bodyHeight = document.body.scrollHeight;
      if (bodyHeight < vh) {
        setSidebarHeight(`100vh`);
      } else {
        setSidebarHeight(`${bodyHeight}px`);
      }
    };
  
    history.listen(() => {
      handleResize();
    });
    // Use a timeout to delay the execution of handleResize
    // const intervalId = setInterval(() => {
    //   handleResize();
    // }, 1000);
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [history]);


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
        <SidebarNav height={sidebarHeight}>
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