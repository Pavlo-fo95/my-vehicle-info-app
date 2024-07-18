import React from 'react';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledCompareArrowsIcon = styled(CompareArrowsIcon)`
  cursor: pointer;
`;

const CompareIcon: React.FC = () => {
  const navigate = useNavigate();

  const handleCompare = () => {
    navigate('/compare');
  };

  return (
    <IconContainer>
      <StyledCompareArrowsIcon 
        onClick={handleCompare} 
        onKeyDown={(e) => { if (e.key === 'Enter') handleCompare(); }}
        role="button"
        tabIndex={0}
      />
    </IconContainer>
  );
};

export default CompareIcon;