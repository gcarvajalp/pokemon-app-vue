import App from '@/App';
import {shallowMount} from '@vue/test-utils'

describe('App component', () => {
  
  test('snapshot', () => {
    
    const wrapper = shallowMount(App)
    expect(wrapper.html()).toMatchSnapshot()

  })
  
})
