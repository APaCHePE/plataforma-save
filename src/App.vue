<template>
  <div id="app">
    <header-app
      :user="user"
      @showmodal="showModal"
      @logout="logout"
    />
    <router-view :userlogin="user"></router-view>
    <modal-login
      :tipoLogin="tipoLogin"
      v-show="enableModal"
      @login="login"
      @close="showModal"
    />
  </div>
</template>

<script>
import HeaderApp from '@/components/layout/HeaderApp.vue'
import ModalLogin from '@/views/shared/login/ModalLogin.vue'
import EventBus from '@/helpers/EventBus'
export default {
  name: 'app',
  components: {
    HeaderApp,
    ModalLogin
  },
  created() {
    // this.$router.push('/'+0)
    EventBus.$on('logout', () => {
        this.logout()
    }),
    this.user = JSON.parse(localStorage.getItem('user')) || null
  },
  data() {
    return {
      enableModal: null,
      user: null,
      tipoLogin: null,
    }
  },
  methods : {
    login(val) {
    //  console.log('-------')
     // console.log(val)
      localStorage.setItem("user", JSON.stringify(val))
      this.user = val
      // this.$router.push('/panel')
      if(val.id_008_tipo == 16){
        this.$router.push('/lawyer')
      }
      // this.$router.push('/lawyer/'+val.id_usuario)
      //}   
     // let idCli =  parseInt(val.id_usuario, 36)
      // let idCli =  this.b64EncodeUnicode(val.id_usuario)
      //  this.$router.push('/'+idCli)
    },

//      b64EncodeUnicode(str) {
//     return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
//         return String.fromCharCode('0x' + p1);
//     }));
// },
    
    showModal (val) {
      console.log(val);
      this.enableModal = val.modal
      if(val.tipo != null )
        this.tipoLogin = val.tipo
    },
    logout() {
      localStorage.clear()
      this.user = null
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
body {
  // background: #DDF3FF;
  font-family: 'Raleway', sans-serif;
  .container {
    max-width: 990px;
    width: 100%;
    margin: auto;
    padding: 0px;
  }
  .text-blue {
    color: #3A7BDD;
  }
  h1 {
    font-size: 20px;
  }
  .el-select .el-input .el-select__caret {
    color: #2ADBB8;
    font-weight: bold;
  }
  .el-input__suffix-inner {
    border-left: 1px solid #DCDFE6;
  }
}

* {
  padding: 0;
  margin: 0;
}
</style>
