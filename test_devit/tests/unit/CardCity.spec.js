import {mount} from '@vue/test-utils'
import CardCity from "@/components/card/CardCity";

describe('test component CardCity.vue', () => {
    const dataCity = {
        'city': "Rīga",
        'temp': 20,
        'weather': "Clouds",
        'feels_like': 20,
    }

    const wrapper = mount(CardCity, {
        propsData: {dataCity}
    });

    it('test props.dataCity', () => {
        expect(wrapper.props().dataCity).toBe(dataCity)
    });

    it('test elem condition', () => {
        expect(wrapper.find('.card-city__info__weather-feel').exists()).toBe(true)
    });
})
