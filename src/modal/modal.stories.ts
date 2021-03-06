import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, text } from "@storybook/addon-knobs/angular";

import { TranslateModule } from "@ngx-translate/core";

import { ModalModule } from "../";
import { Component, Injector, Input } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Modal, ModalService } from "../";

@Modal()
@Component({
	selector: "app-sample-modal",
	template: `
		<ibm-modal>
			<ibm-modal-header (closeSelect)="closeModal()">Header text</ibm-modal-header>
			<section class="bx--modal-content">
				<h1>Sample modal works.</h1>
				<p class="bx--modal-content__text">{{modalText}}</p>
			</section>
			<ibm-modal-footer>
				<button class="bx--btn bx--btn--primary" (click)="closeModal()">Close</button>
			</ibm-modal-footer>
		</ibm-modal>
	`
})
class SampleModalComponent {
	modalText: string;
	constructor(private injector: Injector) {
		this.modalText = this.injector.get("modalText");
	}
}

@Modal()
@Component({
	selector: "app-modal-story",
	template: `
		<button class="bx--btn bx--btn--primary" (click)="openModal()">Open Modal</button>
	`
})
class ModalStory {

	@Input() modalText = "Hello, World";

	constructor(private modalService: ModalService) { }

	openModal() {
		this.modalService.create({
			component: SampleModalComponent,
			inputs: {
				modalText: this.modalText
			}
		});
	}
}

storiesOf("Modal", module)
	.addDecorator(
		moduleMetadata({
			declarations: [
				ModalStory,
				SampleModalComponent
			],
			imports: [
				ModalModule,
				BrowserAnimationsModule,
				TranslateModule.forRoot()
			],
			entryComponents: [
				SampleModalComponent
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<app-modal-story [modalText]="modalText"></app-modal-story>
		<ibm-modal-placeholder></ibm-modal-placeholder>
		`,
		props: {
			modalText: text("modalText", "Hello, World!")
		}
	}
));
