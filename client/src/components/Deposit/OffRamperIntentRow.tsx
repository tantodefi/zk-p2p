import React, { useEffect, useState } from "react";
import styled from 'styled-components/macro'

import { SVGIconThemed } from '../SVGIcon/SVGIconThemed';
import { AccessoryButton } from '@components/common/AccessoryButton';


interface IntentRowProps {
  onRamper: string;
  amountUSDToReceive: string;
  amountUSDCToSend: string;
  expirationTimestamp: string;
  convenienceRewardTimestampRaw: bigint;
  handleCompleteOrderClick: () => void;
}

export type IntentRowData = IntentRowProps;

export const IntentRow: React.FC<IntentRowProps> = ({
  onRamper,
  amountUSDToReceive,
  amountUSDCToSend,
  expirationTimestamp,
  convenienceRewardTimestampRaw,
  handleCompleteOrderClick,
}: IntentRowProps) => {
  IntentRow.displayName = "IntentRow";

  /*
   * Helpers
   */

  const requestedAmountLabel = `${amountUSDCToSend} USDC`;
  const onRamperHashLabel = `$${amountUSDToReceive} from ${onRamper} on Venmo`;
  const orderExpirationLabel = `${expirationTimestamp}`;

  /*
   * State
   */

  const [timeRemainingLabel, setTimeRemainingLabel] = useState<string>('');

  /*
   * Hooks
   */

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = BigInt(Math.floor(Date.now())) / 1000n;
      const expirationTime = convenienceRewardTimestampRaw;
      const timeLeft = expirationTime - now;

      if (timeLeft > 0n) {
        const minutes = (timeLeft / 60n).toString();
        const seconds = (timeLeft % 60n).toString();

        setTimeRemainingLabel(`${minutes.padStart(2, '0')} minutes ${seconds.padStart(2, '0')} seconds`);
      } else {
        setTimeRemainingLabel('Open');

        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(calculateTimeRemaining, 1000);

    calculateTimeRemaining();

    return () => clearInterval(intervalId);
  }, [convenienceRewardTimestampRaw]);

  /*
   * Component
   */

  return (
    <Container>
      <IntentDetailsContainer>
        <SVGIconThemed icon={'usdc'} width={'24'} height={'24'}/>
        <AmountLabelsContainer>
          <AmountContainer>
            <Label>Requesting:&nbsp;</Label>
            <Value>{requestedAmountLabel}</Value>
          </AmountContainer>

          <AmountContainer>
            <Label>Receive:&nbsp;</Label>
            <Value>{onRamperHashLabel}</Value>
          </AmountContainer>

          <AmountContainer>
            <Label>Expires:&nbsp;</Label>
            <Value>{orderExpirationLabel}</Value>
          </AmountContainer>

          <AmountContainer>
            <Label>Convenience Window:&nbsp;</Label>
            <Value>{timeRemainingLabel}</Value>
          </AmountContainer>
        </AmountLabelsContainer>
      </IntentDetailsContainer>

      <ActionsContainer>
        <AccessoryButton
          onClick={handleCompleteOrderClick}
          height={36}
          title={'Complete'}
          icon={'chevronRight'}/>

        <AccessoryButton
          height={36}
          title={'Block'}
          icon={'userX'}/>
      </ActionsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const IntentDetailsContainer = styled.div`
  width: 100%; 
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.25rem 1.5rem;
  gap: 1.25rem;
  line-height: 24px;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1.65rem 0rem;
`;

const AmountLabelsContainer = styled.div`
  width: 100%; 
  display: flex;
  gap: 2px;
  flex-direction: column;
  line-height: 24px;
`;

const AmountContainer = styled.div`
  display: flex;
`;

const Label = styled.label`
  font-size: 15px;
  color: #6C757D;
`;

const Value = styled.label`
  font-size: 15px;
  color: #FFFFFF;
`;
