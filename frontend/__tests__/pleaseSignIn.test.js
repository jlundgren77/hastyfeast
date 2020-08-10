import { mount } from 'enzyme';

import toJSON from 'enzyme-to-json';
import wait from 'waait';

import PleaseSignIn from '../components/PleaseSignin';
import { CURRENT_USER, CURRENT_USER_QUERY } from '../components/User';

import { MockedProvider } from 'react-apollo/test-utils';

import { fakeUser } from '../lib/testUtils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];
describe('<PleasSignIn />', () => {
  it('renders the sign in dialog to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignIn></PleaseSignIn>
      </MockedProvider>
    );
    await wait();
    wrapper.update();

    expect(wrapper.text()).toContain(
      'Please Sign In To Sell An ItemSign into your accountEmailPasswordSign In'
    );
    expect(wrapper.find('Signin').exists()).toBe(true);
  });
  it('renders signed in componet', async () => {
    const Hey = () => <p>Hey!</p>;
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <PleaseSignIn>
          <Hey />
        </PleaseSignIn>
      </MockedProvider>
    );
    await wait();
    wrapper.update();

    expect(wrapper.find('Hey').exists()).toBe(true);
  });
});
