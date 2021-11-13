<template>
  <header>
    <div class="container">
      <div class="top white">
        <div class="logo" v-if="user">
          <router-link to="/" v-if="user.id_008_tipo == 15 | user.id_008_tipo == 5">.pe</router-link>
          <router-link to="/lawyer" v-if="user.id_008_tipo == 16">Tuasesorlegal.pe</router-link>
        </div>
        <div class="logo" v-if="!user">
          <router-link to="/"><img src="../../assets/images/miraflores-en-tu-corazon.png" width="100px"/></router-link>
        </div>

        <div class="r-btn" v-if="user">
          <div class="nameUser"><i class="el-icon-user"></i> <span>Hola, {{user.cuenta}}</span></div>
         
          <div class="casos">
          <a class="btn" href="#" v-if="!user.flag_activado & (user.id_008_tipo == 15 )" @click="grabarmodal()">Mis casos</a>
          <router-link v-if="pathHome & user.flag_activado & (user.id_008_tipo == 15 )" to="/panel" class="btn">Mis casos</router-link>
          </div>
        
          <a class="btn light" href="#" @click="$emit('logout')">Cerrar Sesión</a>
        </div>


        <div class="r-btn" v-else>
          <a class="btn" href="#" @click="$emit('showmodal', { modal: true , tipo: 1}); $emit('tipoLogin', 1)">Ingresa a tu cuenta</a>
          <a class="btn" href="#" @click="$emit('showmodal', { modal: true , tipo: 2}); $emit('tipoLogin', 2)">Soy Funcionario</a>
        </div>

        <message-active :tipoLogin="this.tipoLogin" :usuario="this.user" v-if="showModal" @grabarmodal="grabarmodal"/> 
      </div>
    </div>
  </header>
</template>
<script>

import MessageActive from '@/components/shared/MessageActive.vue'
export default {
  props: ['user'],
  components: {
    MessageActive
  },
  created() {
    console.log(this.user)
  },
  data(){
    return {
      pathHome : null,
      showModal: false,
      tipoLogin: null
    }
  },
  methods: {
    grabarmodal(){
      if(this.showModal == false){
        this.showModal = true
      }
      else{
        this.showModal = false
      }
    },
  },
  watch: {
    '$route' (to) {
      this.pathHome = to.path == '/' ? true : false
    }
  }
};
</script>

<style lang="scss">
// .brr{
//   display: none
// }
.top {
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: solid 1px #ddd;
  &.white {
    // border-bottom: 0px;
    .r-btn {
      > div {
        display: inline-block;
        font-weight: 600;
        color: #3a7bdd;
      }
      span {
        padding-right: 20px;
      }
    }
  }
 
}
header {
  display: flex;
}
.btn {
  padding: 10px 25px;
  margin: 10px;
  color: #fff;
  background: #2adbb8;
  outline: none;
  text-decoration: none;
  border-radius: 20px;
  &.light {
    background: transparent;
    border: solid 1px #2adbb8;
    color: #2adbb8;
    font-weight: 500;
  }
}
    @media only screen and (max-width: 600px) {
    //  .brr{
    //     visibility: visible;
    //   }
    .top { 
      
      flex-direction: column;
      padding-top: 0px;
      align-items: center;
      .logo {
        padding-top: 30px;
        padding-bottom: 30px;
      }
      .r-btn{
          text-align: center;
          bottom: 40px;
          .btn{
            margin-right: 30px !important;
          }
          .nameUser{
            span {
              padding-right: 0px;
            }
          }
          .casos{
            .btn{
              bottom: -22px;
            }
          }
      }
      .nameUser{
      padding: 1rem;
      float: center;
    }
    .btn{
      position: relative;
      &.light{
        float:right;
      }
    }
      
    }
 
  }
</style>