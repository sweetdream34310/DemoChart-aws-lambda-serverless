export interface IFeedbackSubmit {
	type: string;
	dropdownOptionsChosen: Array<string>;
	additionalMessage: string;
	systemInformation: string;
}
