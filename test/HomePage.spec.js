import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import moxios from 'moxios'
import helpers from './helpers'
import HomePage from '../src/views/HomePage.vue'

describe ('HomePage.vue', () => {
	let wrapper

	beforeEach (() => {
		wrapper = mount(HomePage);
	})

	it ('should display welcome text', () => {
		expect(helpers.elementIsHidden(wrapper, '#welcome')).to.equal(false);
		expect(wrapper.find('#welcome h2').text()).to.equal('Hey There!');
	});

	it ('should not show another steps', () => {
		expect(helpers.elementIsHidden(wrapper, '#receipt')).to.equal(true);
		expect(helpers.elementIsHidden(wrapper, '#user')).to.equal(true);
	});

	it ('should move to another step', () => {
		expect(helpers.elementIsHidden(wrapper, '#welcome')).to.equal(false);
		expect(helpers.elementIsHidden(wrapper, '#user')).to.equal(true);

		helpers.click(wrapper, 'button.next');

		expect(helpers.elementIsHidden(wrapper, '#welcome')).to.equal(true);
		expect(helpers.elementIsHidden(wrapper, '#user')).to.equal(false);
	});

	it ('should validate first from positive', () => {
		helpers.click(wrapper, 'button.next');

		helpers.type(wrapper, 'input#first_name', 'Joe');
		helpers.type(wrapper, 'input#last_name', 'Smith');
		helpers.type(wrapper, 'input#email', 'joe.smith@example.com');

		helpers.click(wrapper, 'button.next');

		expect(helpers.elementIsHidden(wrapper, '#receipt')).to.equal(false);
	});

	it ('should validate first from negative', () => {
		helpers.click(wrapper, 'button.next');
		helpers.type(wrapper, 'input#first_name', 'Joe');
		helpers.click(wrapper, 'button.next');

		expect(helpers.elementIsHidden(wrapper, '#receipt')).to.equal(true);
	});

	it ('should validate first from negative too', () => {
		helpers.click(wrapper, 'button.next');

		helpers.type(wrapper, 'input#first_name', 'Joe');
		helpers.type(wrapper, 'input#last_name', 'Smith');
		helpers.type(wrapper, 'input#email', 'joe.smith@example');
		helpers.type(wrapper, 'input#phone', '+ABB 456 123');

		helpers.click(wrapper, 'button.next');

		expect(helpers.elementIsHidden(wrapper, '#receipt')).to.equal(true);
	});

	it ('should not send invalid zip', () => {
		helpers.click(wrapper, 'button.next');

		helpers.type(wrapper, 'input#first_name', 'Joe');
		helpers.type(wrapper, 'input#last_name', 'Smith');
		helpers.type(wrapper, 'input#email', 'joe.smith@example.com');

		helpers.click(wrapper, 'button.next');

		helpers.type(wrapper, 'input#zip', '123 15A');
		
		helpers.click(wrapper, 'button.submit');

		expect(helpers.elementIsHidden(wrapper, '#success')).to.equal(true);
	});

	it ('should send request', (done) => {
		moxios.install();

		helpers.click(wrapper, 'button.next');

		helpers.type(wrapper, 'input#first_name', 'Joe');
		helpers.type(wrapper, 'input#last_name', 'Smith');
		helpers.type(wrapper, 'input#email', 'joe.smith@example.com');

		helpers.click(wrapper, 'button.next');

		helpers.type(wrapper, 'input#zip', '123 155');
		helpers.type(wrapper, 'input#code', '123456');

		let form = wrapper.vm.$children[0];
		form.onSubmit();

		moxios.wait(() => {
			let request = moxios.requests.mostRecent()
			request.respondWith({
				status: 200,
				response: {
					message: 'Goog Job!'
				}
			}).then(() => {
				done();
				expect(helpers.elementIsHidden(wrapper, '#success')).to.equal(false);
			})
		});

		moxios.uninstall();
	});

});