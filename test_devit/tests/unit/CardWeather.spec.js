import {mount} from '@vue/test-utils'
import CardWeather from '@/components/CardWeather.vue'
import CardInfo from "@/components/card/CardInfo";
import CardCity from "@/components/card/CardCity";

describe('test component CardWeather.vue', () => {
    const data = {
        "coord": {"lon": 24.0833, "lat": 57},
        "weather": [{"id": 802, "main": "Clouds"}],
        "main": {
            "temp": 293,
            "feels_like": 293,
            "pressure": 1011,
            "humidity": 69
        },
        "visibility": 10000,
        "wind": {"speed": 4.12, "deg": 330},
        "id": 456173,
        "name": "Rīga"
    }
    const wrapper = mount(CardWeather, {
        propsData: {data: data}
    });

    it('check child components', () => {
        const cardInfo = wrapper.findComponent(CardInfo)
        const cardCity = wrapper.findComponent(CardCity)
        expect(cardInfo.exists()).toBe(true)
        expect(cardCity.exists()).toBe(true)
    });

    it('test method Close Card', () => {
        const close = wrapper.find('.card__close')
        close.trigger('click')
        expect(wrapper.emitted('delete-card')).toBeTruthy()
    });

    it('test computed filterDataCity - return correct object', () => {
        const obj = {
            'city': "Rīga",
            'temp': 20,
            'weather': "Clouds",
            'feels_like': 20,
        }
        expect(wrapper.vm.filterDataCity).toStrictEqual(obj)
    });

    it('test computed filterDataInfo - return correct object', () => {
        const arr = [
            {indicator: 'Wind, km/h', value: 4.12},
            {indicator: 'Visibility', value: 10000},
            {indicator: 'Pressure', value: 1011},
            {indicator: 'Humidity', value: 69}]

        expect(wrapper.vm.filterDataInfo).toStrictEqual(arr)
    });
})
