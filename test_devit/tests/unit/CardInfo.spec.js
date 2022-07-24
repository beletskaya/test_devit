import {mount} from '@vue/test-utils'
import CardInfo from "@/components/card/CardInfo";
import CardIndicator from "@/components/card/CardIndicator";

describe('test component CardIndicator.vue', () => {
    const dataInfo = [
        {indicator: 'Wind, km/h', value: 4.12},
        {indicator: 'Visibility', value: 10000},
        {indicator: 'Pressure', value: 1011},
        {indicator: 'Humidity', value: 69}]

    const wrapper = mount(CardInfo, {
        propsData: {dataInfo}
    });

    it('check child components', () => {
        const cardIndicator = wrapper.findComponent(CardIndicator)
        expect(cardIndicator.exists()).toBe(true)
    });

    it('check child components quantity', () => {
        const cardIndicator = wrapper.findAllComponents(CardIndicator).length
        expect(cardIndicator).toBe(4)
    });

    it('test props.dataInfo', () => {
        expect(wrapper.props().dataInfo).toBe(dataInfo)

    });
})
