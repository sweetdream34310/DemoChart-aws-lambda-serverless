import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { ToastService } from 'src/app/services/toast.service';
import { ModalRef } from 'src/app/components/modal/ModalRef';

@Component({
	selector: 'app-crop-header',
	templateUrl: './cropHeader.component.html',
	styleUrls: ['./cropHeader.component.scss'],
})
export class CropHeaderComponent implements OnInit {
	imageChangedEvent: Event;
	cropperReady = false;
	@ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

	constructor(private toast: ToastService, private modalRef: ModalRef) {}

	ngOnInit(): void {}

	loadImageFailed() {
		this.toast.addToast(
			`Error during loading the image. Please select either a PNG or JPEG`,
			'error'
		);
	}

	crop() {
		// Crop image and return base64 data URL
		if (this.cropperReady) {
			this.modalRef.close(this.imageCropper.crop().base64);
		} else {
			this.toast.addToast('Error during cropping, please try again');
		}
	}
}
