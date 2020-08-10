import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
  id: 'ABC123',
  title: 'A test item',
  price: 5000,
  description: 'This items is for a test',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<Item />', () => {
  it('renders and matches snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  //   it('renders and displays properly', () => {
  //     const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //     const PriceTag = wrapper.find('PriceTag');

  //     expect(PriceTag.children().text()).toBe('$50');
  //     expect(wrapper.find('Title a').text()).toBe('A test item');
  //     const image = wrapper.find('img');
  //     expect(image.props().src).toBe(fakeItem.image);
  //     expect(image.props().alt).toBe(fakeItem.title);
  //   });

  //   it('renders out the buttons', () => {
  //     const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //     const buttonList = wrapper.find('.buttonList');
  //     expect(buttonList.children()).toHaveLength(3);
  //     expect(buttonList.find('AddToCart').exists()).toBeTruthy();
  //     expect(wrapper.find('AddToCart').props().id).toBe(fakeItem.id);
  //   });
});
