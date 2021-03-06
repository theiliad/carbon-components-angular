import {
	ComponentRef,
	ViewContainerRef
} from "@angular/core";
import { Injectable } from "@angular/core";
import { ModalPlaceholderService } from "./../modal/modal-placeholder.service";

/**
 * Singleton service used by dialog-placeholder to register the container for dialogs to insert into.
 * Also tracks all active dialogs.
 *
 * Subclass of ModalPlaceholderService
 *
 * TODO: Try and unify modal and dialog placeholders
 *
 * @export
 * @class ModalPlaceholderService
 */
@Injectable()
export class DialogPlaceholderService extends ModalPlaceholderService {}
