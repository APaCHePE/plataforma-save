<template>
  <div class="single">
    <div class="container">
      <div class="single--container">
        <el-card shadow="always" class="card-medium">
          <h2>Su Email ha sido validadooo</h2>
            <el-button type="primary" @click="logout()" round>Continuar</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/helpers/EventBus'
export default {
  data() {
    return {
      id_cuenta: {
        hash: null
      }
    };
  },
  created(){
    this.id_cuenta.hash = this.$route.params.id;
    this.activar()
  },
  methods: {
    activar(){
      const endpoint = "/usuario/ActivarHash/";
       this.$http.post(endpoint,this.id_cuenta).then((response) => {
        console.log(response)
      });
    },
    logout(){
      EventBus.$emit('logout')
    }
  }
};
</script>

<style lang="scss">
.card-medium {
  margin: auto;
  margin-top: 15%;
  max-width: 500px;
  text-align: center;
  h2 {
    padding: 25px;
  }
}
</style>