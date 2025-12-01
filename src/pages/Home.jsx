import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { grades } from "../data/grades";
import GradeCard from "../components/GradeCard";

const Hero = styled.section`
  position: relative;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.gradientStart},
    ${({ theme }) => theme.colors.gradientEnd}
  );
  color: white;
  text-align: center;
  padding: 64px 16px 40px;
`;

const Slogan = styled.h1`
  margin: 0 auto 16px;
  max-width: 800px;
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 800;
`;

const CTAWrap = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTA = styled(Link)`
  background: white;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: 600;
  min-width: 200px;
`;

const Section = styled.section`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 24px auto;
  padding: 0 16px;
  position: relative;
`;

const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 22px;
`;

const RailWrapper = styled.div`
  position: relative;
`;

const Rail = styled.div`
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 6px;
    &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px; /* width of the fade */
    pointer-events: none;
    z-index: 1;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
      &::before {
    left: 0;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.surface}, transparent);
    opacity: ${({ canScrollLeft }) => (canScrollLeft ? 1 : 0)};
    transition: opacity 0.3s;
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, ${({ theme }) => theme.colors.surface}, transparent);
    opacity: ${({ canScrollRight }) => (canScrollRight ? 1 : 0)};
    transition: opacity 0.3s;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ left }) => (left ? "left: -30px;" : "right: -30px;")}
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow};
  font-size: 18px;
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }

  ${({ hidden }) => hidden && "display: none;"}
`;

export default function Home() {
  const { t } = useTranslation();
  const railRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const rail = railRef.current;
    if (!rail) return;

    rail.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      rail.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scroll = (direction) => {
    if (!railRef.current) return;
    const { scrollLeft, clientWidth } = railRef.current;
    const scrollAmount = clientWidth * 0.8;
    railRef.current.scrollTo({
      left: direction === "right" ? scrollLeft + scrollAmount : scrollLeft - scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Hero>
        <Slogan>{t("brand.slogan")}</Slogan>
        <CTAWrap>
          <CTA to="/activities">{t("home.ctaActivities")}</CTA>
          <CTA to="/materials">{t("home.ctaMaterials")}</CTA>
        </CTAWrap>
      </Hero>

      <Section>
        <Title>{t("home.featured")}</Title>
        <RailWrapper>
          <Rail ref={railRef}>
            {grades.map((g) => (
              <GradeCard
                key={g.id}
                to={`/activities/grade/${g.id}`}
                tag={g.tag}
                title={g.title}
                desc={g.desc}
                gradeId={g.id}
              />
            ))}
          </Rail>

          <ScrollButton
            left
            onClick={() => scroll("left")}
            hidden={!canScrollLeft}
          >
            ‹
          </ScrollButton>
          <ScrollButton
            onClick={() => scroll("right")}
            hidden={!canScrollRight}
          >
            ›
          </ScrollButton>
        </RailWrapper>
      </Section>
    </>
  );
}
