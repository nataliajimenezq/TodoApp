import { shallowMount } from '@vue/test-utils';
import TodoInput from '@/components/TodoInput.vue';

describe('TodoInput.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoInput, {
      props: {
        modelValue: '',
      },
    });
  });

  test('Render component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('fills input with target value ', async () => {
    const inputTag = wrapper.find('input');
    await inputTag.setValue('Go to Gym');
    expect(wrapper.find('input').element.value).toBe('Go to Gym');
  });

  test('fills input with target value ', async () => {
    const inputTag = wrapper.find('input');
    const message = 'Go to Gym';
    await inputTag.setValue(message);
    await inputTag.trigger('keyup.enter');
    expect(wrapper.emitted('addTodo', message));
  });
});
