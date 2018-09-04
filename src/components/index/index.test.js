import React from 'react';
import { shallow } from 'enzyme';
import Index from './index';


describe('Tests for Home', () => {
  it('displays all required info', () => {
    const wrapper = shallow(<Index />);
    const welcome = <h1>Welcome to Hello Books</h1>
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.contains(welcome)).toBe(true)
  })
})