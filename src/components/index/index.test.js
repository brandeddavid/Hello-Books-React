import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Index from './index';


describe('Tests for Index', () => {
  const wrapper = shallow(<Index />);
  it('displays all divs', () => {
    expect(wrapper.find('div').length).toBe(6);
  })
  it('renders content', () => {
    expect(wrapper.find('h1').text()).toEqual('Welcome to Hello Books')
  });
})