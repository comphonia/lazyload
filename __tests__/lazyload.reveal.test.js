import { revealElement } from "../src/lazyload.reveal";
import getSettings from "../src/lazyload.defaults";
import expectExtend from "./lib/expectExtend";

test("revealElement is defined", () => {
	expect(typeof revealElement).toBe("function");
});

/*
Create an element
call revealElement(element, settings) on it
check that:
- data-was-processed is set to true
- callback_set is called (element)
- setSources is called with (element, settings)
- event listener to load and error have been set
- class class_loading has been set
*/

expectExtend(expect);

describe("revealElement...", () => {
	var img, div;

	beforeEach(() => {
		div = document.createElement("div");
		div.appendChild((img = document.createElement("img")));
	});

	afterEach(() => {
		div.removeChild(img);
		img = null;
		div = null;
	});

	test("...data-was-processed is set", () => {
		revealElement(img, getSettings());
		expect(img).toHaveAttributeValue("data-was-processed", "true");
	});

	test("...callbacks are called", () => {
		var callbackEnterMock = jest.fn();
		var callbackSetMock = jest.fn();
		revealElement(
			img,
			getSettings({
				callback_enter: callbackEnterMock,
				callback_set: callbackSetMock
			}),
			true
		);
		expect(callbackEnterMock).toHaveBeenCalledTimes(1);
		expect(callbackSetMock).toHaveBeenCalledTimes(1);
		expect(callbackEnterMock).toHaveBeenCalledWith(img);
		expect(callbackSetMock).toHaveBeenCalledWith(img);
	});
});
