import React from 'react';
import { Switch } from '@mui/material';
import styled from 'styled-components';

import QuestionHelper from '@components/common/QuestionHelper';


interface LabeledSwitchProps {
  switchChecked: boolean;
  onSwitchChange: (checked: boolean) => void;
  checkedLabel?: string;
  uncheckedLabel?: string;
  helperText?: string;
}

export const LabeledSwitch: React.FC<LabeledSwitchProps> = ({
  switchChecked = true,
  onSwitchChange,
  checkedLabel = 'Checked Label',
  uncheckedLabel = 'Unchecked Label',
  helperText = 'Fill me out'
}) => {
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSwitchChange(event.target.checked);
  };

  return (
    <Container>
      <SwitchLabel>
        {switchChecked ? checkedLabel :uncheckedLabel}
      </SwitchLabel>
      
      <HelperContainer>
        <QuestionHelper
          text={helperText}
        />
      </HelperContainer>

      <Switch
        checked={switchChecked}
        onChange={handleSwitchChange}
        color={switchChecked ? 'primary' : 'secondary'}
      />
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SwitchLabel = styled.span`
  color: '#888888';
  padding-right: 4px;
`;

const HelperContainer = styled.div`
  padding-top: 4px;
`;
