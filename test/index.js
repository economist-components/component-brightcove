import 'babel-polyfill';
import Brightcove from '../src';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
chai.use(chaiEnzyme()).should();
describe('Brightcove', () => {

  it('renders a React element', () => {
    React.isValidElement(<Brightcove />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let brightcove = null;
    beforeEach(() => {
      rendered = mount(<Brightcove />);
      brightcove = rendered.find('.brightcove');
    });

    it('renders a top level div.brightcove', () => {
      brightcove.should.have.tagName('div');
      brightcove.should.have.className('brightcove');
    });

    xit('renders <FILL THIS IN>', () => {
      brightcove.should.have.exactly(1).descendants('.the-descendent-class');
      brightcove.find('.the-descendent-class').should.have.tagName('TAG');
    });

  });

});
