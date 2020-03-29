import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';
import { exportAllDeclaration } from "../node_modules/@babel/types";

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state);
  return wrapper;
}
/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders withour an error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);

});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
})

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
})

//I wrote the below and it works too

test('clicking button increments counter display', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  const incrementedCounterState = wrapper.state('counter');
  expect(incrementedCounterState).toBe(initialCounterState + 1);
})

test('clicking increment button increments counter display - second test', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
})

test('clicking decrement button decrements counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //find button and click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
})

test('no count below zero', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  //find button and click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(0);
})

test('no count below zero error message', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  //find button and click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');


  //find error message para and check value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toBe('Counter cannot go below 0');
})

test('clear error message on increment', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });
  //find decrement button and click
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  //find increment button and click
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');

  //find message and check
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toBe('The counter is currently 1');
})