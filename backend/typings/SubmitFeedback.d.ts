export interface SubmitFeedback {
    type: string;
    dropdownOptionsChosen: Array<string>;
    additionalMessage: string;
    systemInformation?: string;
}
