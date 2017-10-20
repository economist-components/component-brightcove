import 'babel-polyfill';
import Brightcove from '../src';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiSpies from 'chai-spies';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme()).use(chaiSpies).should();
mocha.setup({ globals: [ 'brightcove', 'brightcoveJS', 'checkLoad', 'experienceElement' ] });

describe('brightcove video', () => {
  let getBrightcoveExperience = null;
  let brightcove = null;
  beforeEach(() => {
    getBrightcoveExperience = () => Promise.resolve(brightcove);
    brightcove = {
      createExperiences: chai.spy(),
      removeExperience: chai.spy(),
    };
  });
  it('renders an object element with params', () => {
    const wrapper = mount(
      <Brightcove
        getBrightcoveExperience={getBrightcoveExperience}
        width={1234}
        height={12345}
        videoID="video-id"
        playerID="player-id"
        playerKey="player-key"
        labels={'http://example.com/labels.xml'}
      />
    );
    wrapper.find('param[name="width"]').should.have.attr('value', '1234');
    wrapper.find('param[name="height"]').should.have.attr('value', '12345');
    wrapper.find('param[name="playerID"]').should.have.attr('value', 'player-id');
    wrapper.find('param[name="playerKey"]').should.have.attr('value', 'player-key');
    wrapper.find('param[name="@videoPlayer"]').should.have.attr('value', 'video-id');
    wrapper.find('param[name="labels"]').should.have.attr('value', 'http://example.com/labels.xml');
  });
  describe('lifetime methods', () => {
    let player = null;
    beforeEach(() => {
      player = new Brightcove({}, {}, {});
      player.props.getBrightcoveExperience = getBrightcoveExperience;
    });
    it('set the brightcove experience up and assign the API to the instance', () => {
      player.componentDidMount();
      return player.loadBrightcoveScript().then(() => {
        brightcove.createExperiences.should.have.been.called.once();
        player.brightcove.should.equal(brightcove);
      });
    });
    it('tear down the brightcove experience', () => {
      player.brightcove = brightcove;
      player.props.experienceID = 'experience-id';
      player.componentWillUnmount();
      brightcove.removeExperience.should.have.been.called.with('experience-id');
    });
  });
});
