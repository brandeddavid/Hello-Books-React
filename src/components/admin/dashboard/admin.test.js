import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import AdminDash from './admin';


describe('Tests for Admin', () => {
  const wrapper = shallow(<AdminDash />);
  it('displays all divs', () => {
    expect(wrapper.find('div').length).toBe(16);
  })
})