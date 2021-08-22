import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'


describe('PokemonPage Component', () => {

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage)
  })

  test('snapshot', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe llamar mixPokemonArray al montar', () => {

    const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
    const wrapper = shallowMount(PokemonPage)
    expect(mixPokemonArraySpy).toHaveBeenCalled()

  })

  test('debe hacer match con el snapshot cuando cargan los pokemon', () => {

    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[1],
          showPokemon: false,
          showAnswer: false,
          message: "",
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe mostrar los componentes de PokemonPicture y PokemonOptions', () => {

    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[1],
          showPokemon: false,
          showAnswer: false,
          message: "",
        }
      }
    })

    expect(wrapper.find('pokemon-picture-stub').exists()).toBeTruthy()
    expect(wrapper.find('pokemon-options-stub').exists()).toBeTruthy()
    expect(wrapper.find('pokemon-picture-stub').attributes('pokemonid')).toBe('2')
    expect(wrapper.find('pokemon-options-stub').exists('pokemons')).toBe(true)
    // console.log(wrapper.find('pokemon-options-stub').attributes())

  })

  test('pruebas con checkAnswer', async () => {

    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        }
      }
    })

    await wrapper.vm.checkAnswer(1)

    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.vm.showPokemon).toBe(true)
    expect(wrapper.find('h2').text()).toBe(`Muy bien!, es ${pokemons[0].name}`)
    
    await wrapper.vm.checkAnswer(3)

    expect(wrapper.find('h2').text()).toBe(`Oh! es ${pokemons[0].name}, sigue practicando!`)

    expect(wrapper.vm.message).toBe(`Oh! es ${pokemons[0].name}, sigue practicando!`)
    
  })





})
