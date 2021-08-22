import PokemonPicture from '@/components/PokemonPicture'
import {shallowMount} from '@vue/test-utils'

describe('PokemonPicture component', () => {
  
  test('snapshot', () => {

    const wrapper = shallowMount(PokemonPicture,{
      props:{
        pokemonId: 1,
        showPokemon: false
      }
    })
    expect(wrapper.html()).toMatchSnapshot()

  })

  test('debe mostrar la imagen oculta y el pokemon 100', () => {
    
    const wrapper = shallowMount(PokemonPicture,{
      props:{
        pokemonId: 100,
        showPokemon: false
      }
    })

    const [img1, img2] = wrapper.findAll('img')

    expect(img1.exists()).toBeTruthy()
    expect(img2).toBe(undefined)
    expect(img1.classes('hidden-pokemon')).toBeTruthy()
    expect(img1.attributes('src').includes('100.svg')).toBe(true)
  })

  test('debe mostrar el pokemon si showPokemon:true', () => {
    
    const wrapper = shallowMount(PokemonPicture,{
      props:{
        pokemonId: 1,
        showPokemon: true
      }
    })

    // console.log(wrapper.findAll('img'));
    const [img1, img2] = wrapper.findAll('img')
    expect(img1.exists()).toBeTruthy()
    expect(img2).toBe(undefined)
    expect(img1.classes('hidden-pokemon')).toBe(false)
    expect(img1.classes('fade-in')).toBe(true)
  })
  
})
