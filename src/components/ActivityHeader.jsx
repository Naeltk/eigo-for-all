import styled from "styled-components";


const ActivityHeaderContainer = styled.div`
  position: relative;
  background:${({ theme }) => theme.colors.primaryLight};
  color: white;
  text-align: center;
  padding: 16px 16px 16px;
  border-radius: 12px;
  margin-bottom: 16px;

`

export default function ActivityHeader({title, description }) {

  return (
    <ActivityHeaderContainer>
      <h1>{title}</h1>
      <h2>{description}</h2>
    </ActivityHeaderContainer>
  );
}
