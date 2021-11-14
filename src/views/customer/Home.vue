<template>
  <div class="light">
    <div class="container">
      <div class="description" >
        <p class="text-center" style="align: center">
          Ahora reporta un problema en tu 
          <span class="text-blue">Plataforma Digital</span>
        </p>
      </div>
      <div class="bottom">
        <router-link to="/consult" class="card">
          <div class="card-left">
            <img src="@/assets/icono2.png" alt="" />
          </div>
          <div class="card-right">
            <h1>Servicio de Atencion Vecinal</h1>
            <p>
              Juntos mejoramos nuestro distrito, 
              <span>reportar un incidente.</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <!-- <a href="#" class="card b-green">
          <div class="card-left">
            <img src="@/assets/icono2.png" alt="" />
          </div>
          <div class="card-right">
            <h1>Busco un abogado</h1>
            <p>
              Estoy buscando servicios legales, necesito
              <span>contratar a un profesional.</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </a> -->
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '@/helpers/EventBus'
export default {
  data() {
    return {
      user:{
        redirecEmail: null, 
        cuenta: null,
        clave: null,
        tipo:null
      }

    }
  },

  created() {
    // document.body.style.backgroundColor = "#DDF3FF";
    document.body.style.backgroundColor = "#EAF0F9";
    console.log(this.$route.params["hash"])
    if(this.$route.params["hash"]){

      const endpoint = '/ObtenerUserPas/'+ this.$route.params["hash"]
      this.$http.get(endpoint).then((response) => {
       console.log(response.data.respuesta[0].cuenta) 
       this.user.redirecEmail = true
       this.user.tipo = 2
       this.user.cuenta = response.data.respuesta[0].cuenta
       this.user.clave =  response.data.respuesta[0].clave

      console.log(this.user)
      EventBus.$emit('sendData', this.user)

     }).catch((e) => {
        console.log(e);
      });


      // const user = {
      //   redirecEmail: true, 
      //   cuenta: "nuevo12@prueba.com",
      //   clave: "123456"
      // }
      // //obtener contraseña
      // EventBus.$emit('sendData', user)
    }
  },
  destroyed() {
    document.body.style.backgroundColor = "#fff";
  },
};
</script>
<style lang="scss">
.light {
  .bottom {
    &:before {
      width: 120%;
      height: 100%;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      background: #fff;
      content: "";
      position: fixed;
      z-index: -1;
      left: -10%;
      top: 57%;
    }
    .card {
      text-decoration: none;
      max-width: 450px;
      margin: auto auto 40px auto;
      background: #3a7bdd;
      border-radius: 18px;
      padding: 30px;
      display: flex;
      overflow: hidden;
      position: relative;
      .card-right {
        span {
          color: #7bfff9;
        }
      }
      &:hover {
        box-shadow: inset 0 0 0 4px #ffffff6e;
        // transition: color 0.25s;
        // &::before,
        // &::after {
        //   // Set border to invisible, so we don't see a 4px border on a 0x0 element before the transition starts
        //   border: 2px solid transparent;
        //   width: 0;
        //   height: 0;

        // // box-shadow: 0 4px 25px hsl(216deg 71% 55%);
        transition: box-shadow 0.4s;
        // }
        &:before {
          right: 0px;
          transition: right 0.4s;
        }
        i {
          right: -30px;
          transition: right 0.4s;
        }
      }
      &.b-green {
        background: #2adbb8;
        .card-right {
          span {
            color: #007760;
          }
        }
      }
      &-right {
        color: #fff;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &:before {
          width: 1px;
          left: -23px;
          content: "";
          background: #ffffff3d;
          height: 105px;
          position: absolute;
          // top: -15px;
        }
      }
      &-left {
        padding-right: 45px;
        // img {
        //   width: 80px;
        // }
      }
      h1 {
        font-size: 20px;
        padding-bottom: 15px;
      }
      i {
        position: absolute;
        right: -55px;
        transition: right 0.4s;
        font-size: 25px;
      }
      &:before {
        width: 150px;
        height: 132px;
        shape-outside: circle(27% at 51%);
        clip-path: circle(45% at 115%);
        background: #ffffff57;
        content: "";
        position: absolute;
        right: -45px;
        top: 15px;
        transition: right 0.4s;
      }
    }
  }
  .description {
    display: block;
    p {
      text-align: center;
      font-size: 30px;
      max-width: 415px;
      margin: auto;
      padding-top: 60px;
      padding-bottom: 40px;
      span {
        font-weight: bold;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .light {
    .description p {
      font-size: 29px;
      max-width: 315px;
    }
    .bottom .card {
      max-width: 240px;
      display: flex;
      text-align: center;
      flex-direction: column;
    }
    .bottom .card-left {
      padding: 0px;
      padding-bottom: 10px;
    }
    .bottom .card-right:before {
      content: none;
    }
  }
}
</style>