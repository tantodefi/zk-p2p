import React from "react";
import styled from 'styled-components';
import { ArrowLeft } from 'react-feather';
import QRCode from "react-qr-code";
import Link from '@mui/material/Link';

import { Button } from "@components/common/Button";
import { Overlay } from '@components/modals/Overlay';
import { commonStrings } from '@helpers/strings';
import { PaymentRequirementDrawer } from "@components/Swap/PaymentRequirementDrawer";
import { PaymentPlatformType } from '@helpers/types';
import { ThemedText } from '@theme/text';
import { ZKP2P_TG_INDIA_CHAT_LINK } from "@helpers/docUrls";


interface SwapModalProps {
  isVenmo: boolean;
  venmoId: string;
  link: string;
  amount: string;
  onBackClick: () => void
  onCompleteClick: () => void
  paymentPlatform: PaymentPlatformType
}

export const SwapModal: React.FC<SwapModalProps> = ({
  isVenmo,
  venmoId,
  link,
  amount,
  onBackClick,
  onCompleteClick,
  paymentPlatform
}) => {
  /*
   * Handlers
   */

  const handleOverlayClick = () => {
    onBackClick();
  };

  const handleCompleteClick = () => {
    onCompleteClick();
  };

  /*
   * Helpers
   */

  const currencySymbol = isVenmo ? '$' : '₹';
  const paymentPlatformName = isVenmo ? 'Venmo' : 'HDFC';
  const troubleScanningQRCodeLink = isVenmo ? link : ZKP2P_TG_INDIA_CHAT_LINK;
  const instructionsText = `Scan and send ${currencySymbol}${amount}` + (!isVenmo ? `<br />to ${venmoId}` : '');

  /*
   * Component
   */

  return (
    <ModalAndOverlayContainer>
      <Overlay onClick={handleOverlayClick}/>

      <ModalContainer $isVenmo={isVenmo}>
        <RowBetween>
          <div style={{ flex: 0.25 }}>
            <button
              onClick={handleOverlayClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <StyledArrowLeft/>
            </button>
          </div>

          <ThemedText.HeadlineSmall style={{ flex: '1', margin: 'auto', textAlign: 'center' }}>
            Send {paymentPlatformName} Payment
          </ThemedText.HeadlineSmall>

          <div style={{ flex: 0.25 }}/>
        </RowBetween>

        <QRContainer>
          <QRCode
            value={link}
            size={192}/>
        </QRContainer>
        <QRLabel>
          <Link href={troubleScanningQRCodeLink} target="_blank">  
            Trouble scanning QR?
          </Link>
        </QRLabel>

        <InstructionsContainer>
          <InstructionsTitle
            dangerouslySetInnerHTML={{ __html: instructionsText }}
          />

          <InstructionsLabel>
            { commonStrings.get('PAY_MODAL_INSTRUCTIONS') }
            <Link href="https://docs.zkp2p.xyz/zkp2p/user-guides/on-ramping" target="_blank">
              Learn more ↗
            </Link>
          </InstructionsLabel>
        </InstructionsContainer>

        <PaymentRequirementDrawer
          paymentPlatform={paymentPlatform}
        />

        <ButtonContainer>
          <Button
            onClick={async () => {
              handleCompleteClick();
            }}
          >
            I have completed payment
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalAndOverlayContainer>
  );
};

const ModalAndOverlayContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: flex-start;
  top: 0;
  left: 0;
  z-index: 10;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  color: #FFF;
`;

const ModalContainer = styled.div<{$isVenmo?: boolean}>`
  width: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 1rem;
  background: #0D111C;
  justify-content: space-between;
  color: #FFF;
  align-items: center;
  z-index: 20;
  gap: 1.5rem;
  top: 12%;
  position: relative;
  height: ${({ $isVenmo }) => $isVenmo ? '588px' : '612px'};
  overflow-y: auto;
`;

const QRContainer = styled.div`
  padding: 1.4rem 1.5rem 1.2rem;
  border: 1px solid #98a1c03d;
  border-radius: 16px;
  background: #131A2A;
`;

const InstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: 0 1.75rem;
`;

const InstructionsTitle = styled.div`
  line-height: 1.3;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const InstructionsLabel = styled.div`
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
`;

const RowBetween = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: grid;
`;

const QRLabel = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: -1rem;
  line-height: 1.5;
`;
