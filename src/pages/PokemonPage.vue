<template>
  <h1 v-if="!pokemon">Espere por favor ...</h1>

  <div v-else>
    <h1>¿Quien es este pokemón?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions";
import PokemonPicture from "@/components/PokemonPicture";

import getPokemonOptions from "@/helpers/getPokemonOptions";

// console.log(getPokemonOptions())

export default {
  name: "PokemonPage",
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(pokemonId) {
      this.showPokemon = true
      this.showAnswer = true
      this.message =
        this.pokemon.id === pokemonId
          ? `Muy bien!, es ${this.pokemon.name}`
          : `Oh! es ${this.pokemon.name}, sigue practicando!`;
    },
    newGame(){
      this.showPokemon = false
      this.showAnswer = false
      this.pokemon = null
      this.message = ''
      this.pokemonArr = []
      this.mixPokemonArray();  
    }
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style>
</style>