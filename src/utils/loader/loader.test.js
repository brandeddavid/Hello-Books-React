import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Loader from './loader';


describe('Tests for Admin', () => {
  const wrapper = shallow(<Loader />);
  it('displays all divs', () => {
    expect(wrapper.find('div').length).toBe(1);
  })
})