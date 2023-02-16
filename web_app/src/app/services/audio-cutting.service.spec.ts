import { TestBed } from '@angular/core/testing';

import { AudioCuttingService } from './audio-cutting.service';

describe('AudioCuttingService', () => {
	let service: AudioCuttingService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AudioCuttingService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
