import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';
import todosMock from '@/mock';

describe('TodoList.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoList, {
      props: {
        todos: todosMock,
      },
    });
  });

  test('Render component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
