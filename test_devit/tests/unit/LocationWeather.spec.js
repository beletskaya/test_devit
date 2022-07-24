import {mount} from '@vue/test-utils'
import LocationWeather from '@/components/LocationWeather.vue'

describe('test component LocationWeather.vue', () => {
    const wrapper = mount(LocationWeather, {
        propsData: {incorrectCity: false}
    })

    it('initialized correctly', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper.is(LocationWeather)).toBe(true);
    });

    it('renders props.incorrectCity when passed', () => {
        expect(wrapper.props().incorrectCity).toBeFalsy()
    });

    it('check data', () => {
        wrapper.setData({city: 'Chicago'})
        expect(wrapper.vm.city).toBe('Chicago')
    });
})
