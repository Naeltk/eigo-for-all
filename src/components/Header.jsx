import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";



const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${({ theme }) => theme.colors.surface || '#fff'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#eee'};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth || '1200px'};
  margin: 0 auto;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 18px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  padding: 8px 10px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text || '#333'};
  text-decoration: none;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.bg || '#f5f5f5'};
  }
  &.active {
    background: ${({ theme }) => theme.colors.bg || '#f0f0f0'};
    font-weight: 600;
  }
`;

const Hamburger = styled.div`
  width: 26px;
  height: 22px;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  span {
    height: 3px;
    background: ${({ theme }) => theme.colors.text || "#333"};
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;

  background: ${({ theme }) => theme.colors.surface || "#fff"};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || "#ddd"};

  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  padding: 12px;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
`;

const ActionButton = styled(Link)`
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  min-height: 36px;
  white-space: nowrap;

  color: white;
  text-decoration: none;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary || '#007bff'},
    ${({ theme }) => theme.colors.primaryDark || '#0056b3'}
  );

  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.2);
  transition: 0.2s;

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 14px;
    border-radius: 10px;
    min-height: 34px;
  }
`;



const AvatarWrapper = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary || '#007bff'};
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.2);
  }
`;


const Menu = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: ${({ theme }) => theme.colors.surface || '#fff'};
  border: 1px solid ${({ theme }) => theme.colors.border || '#ddd'};
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  
  // Visibility controlled by React state via prop
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')}; 
  
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
`;

const MenuItem = styled.button`
  padding: 10px 14px;
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  color: ${({ theme }) => theme.colors.text || '#333'};
  &:hover {
    background: ${({ theme }) => theme.colors.bg || '#f5f5f5'};
  }
`;



export default function Header() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
  setIsMobileMenuOpen(prev => !prev);
};


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
    navigate("/signin");
  };



  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  }

  return (
    <Bar>
      <Container>
        <Link to="/">
          <Logo />
        </Link>
        <Right>
          <Nav>
            <NavItem to="/">{t("nav.home")}</NavItem>
            <NavItem to="/activities">{t("nav.activities")}</NavItem>
            <NavItem to="/materials">{t("nav.materials")}</NavItem>
            <NavItem to="/about">{t("nav.about")}</NavItem>
          </Nav>
          {/* Hamburger for mobile */}
            <Hamburger onClick={toggleMobileMenu}>
           <span></span>
           <span></span>
           <span></span>
          </Hamburger>

{/* Mobile dropdown menu */}
        <MobileMenu $isOpen={isMobileMenuOpen}>
        <NavItem onClick={() => handleNavigate("/")}>{t("nav.home")}</NavItem>
        <NavItem onClick={() => handleNavigate("/activities")}>{t("nav.activities")}</NavItem>
       <NavItem onClick={() => handleNavigate("/materials")}>{t("nav.materials")}</NavItem>
       <NavItem onClick={() => handleNavigate("/about")}>{t("nav.about")}</NavItem>
        </MobileMenu>
          <LanguageSwitcher />

          {user ? (
            <AvatarWrapper ref={wrapperRef}>
              <Avatar onClick={toggleMenu}>
                {user.email ? user.email[0].toUpperCase() : "U"}
              </Avatar>
              <Menu $isOpen={isMenuOpen}>
                <MenuItem onClick={() => handleNavigate("/account")}>
                  {t("nav.profile") || "Show Profile"}
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  {t("nav.signout") || "Sign Out"}
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/delete-account")}>
                  {t("nav.delete") || "Delete Account"}
                </MenuItem>
              </Menu>
            </AvatarWrapper>
          ) : (
            <ActionButton to="/signup">
              {t("nav.signup")}/{t("nav.signin")}
            </ActionButton>
          )}
        </Right>
      </Container>
    </Bar>
  );
}