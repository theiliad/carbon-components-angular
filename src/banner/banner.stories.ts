import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withNotes } from "@storybook/addon-notes";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, object } from "@storybook/addon-knobs/angular";

import { Component } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";

import { BannerModule, BannerService } from "../";


@Component({
	selector: "app-banner-story",
	template: `
		<button class="bx--btn bx--btn--primary" (click)="showBanner()">Show info banner</button>
		<div class="banner-container"></div>
	`,
	providers: [BannerService]
})
class BannnerStory {

	constructor(private bannerService: BannerService) { }

	showBanner() {
		this.bannerService.showBanner({
			type: "info",
			title: "Sample banner",
			message: "Sample info message",
			target: ".banner-container"
		});
	}
}

storiesOf("Banner", module)
	.addDecorator(
		moduleMetadata({
			declarations: [
				BannnerStory
			],
			imports: [
				BannerModule,
				TranslateModule.forRoot()
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<ibm-banner [bannerObj]="{type: 'error', title: 'Sample banner', message: 'Sample error message'}"></ibm-banner>
			<ibm-banner [bannerObj]="{type: 'info', title: 'Sample banner', message: 'Sample info message'}"></ibm-banner>
			<ibm-banner [bannerObj]="{type: 'success', title: 'Sample banner', message: 'Sample success message'}"></ibm-banner>
			<ibm-banner [bannerObj]="{type: 'warning', title: 'Sample banner', message: 'Sample warning message'}"></ibm-banner>
		`
	}))
	.add("Dynamic", () => ({
		template: `
			<app-banner-story></app-banner-story>
		`
	}))
	.add("Toast", () => ({
		template: `
			<ibm-toast [bannerObj]="{
				type: 'error',
				title: 'Sample banner',
				subtitle: 'Sample subtitle message',
				caption: 'Sample caption'
			}"></ibm-toast>
		`
	}));
