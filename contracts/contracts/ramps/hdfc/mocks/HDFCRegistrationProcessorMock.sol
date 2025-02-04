//SPDX-License-Identifier: MIT

import { IRegistrationProcessor } from "../interfaces/IRegistrationProcessor.sol";

pragma solidity ^0.8.18;

contract HDFCRegistrationProcessorMock is IRegistrationProcessor {

    /* ============ Constructor ============ */
    constructor() {}

    /* ============ External View Functions ============ */
    function processProof(
        RegistrationProof calldata _proof
    )
        public
        pure
        override
        returns(bytes32 userIdHash)
    {
        return(bytes32(_proof.signals[1]));
    }
}
