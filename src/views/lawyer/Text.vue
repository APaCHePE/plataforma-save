<template>
  <div class="single">
    <div class="container">
      <div class="single--container">
        <p class="back">
          <router-link to="/lawyer"><i class="el-icon-back"></i>Regresar</router-link>
        </p>
        <p>
          Lugar:  Miraflores</p>
        <p>
          Fecha:  {{fechaActual}}
        </p>
        <div >
          <el-form :label-position="labelPosition" :model="listUpAsesoriaAbogado" label-width="100px" :rules="rules" ref="listUpAsesoriaAbogado" hide-required-asterisk>
            <el-form-item prop="descripción_solicitante">
              <h1 class="title text-blue">Responde al caso</h1>
              <el-input class="textarea-height" type="textarea" v-model="listUpAsesoriaAbogado.respuesta"></el-input>
            </el-form-item>
            <el-form-item class="element-right">
              <el-button type="primary"  @click="grabarmodal()" round>Responder</el-button>
            </el-form-item>
          </el-form>
        </div>
         <message-answer v-if="showModal" @grabarmodal="updateAsesoriaAbogado" :detail="listUpAsesoriaAbogado"/> 
      </div>
    </div>
  </div>
</template>
<script>

import MessageAnswer from '@/components/shared/MessageAnswer.vue'
import EventBus from '@/helpers/EventBus'
export default {
  props:['id','userlogin'],
  components: {
    MessageAnswer
  },
  created() {
    var fecha =new Date()
    var mes = fecha.getMonth()+1
    this.fechaActual = fecha.getDate() +"/"+ mes +"/"+ fecha.getFullYear()
    document.body.style.backgroundColor = "#fff";
    // this.getUbigeo();
    this.getAsesoriaAbogado();
    this.listUpAsesoriaAbogado.id_asesoria_abogado = this.id;
    console.log(this.listUpAsesoriaAbogado)
  },
  data() {
    return {

      //nuevas variables 
      fechaActual:null,
      //
      cambiarEstado: {
        id_asesoria: null,
        id_005_estado: 9
      },
      textDefecto: null,
      listAsesoriaAbogado: null,
      labelPosition: "top",
      showModal: false,
      showModalSend: null,
      user: {
        usuario: {
          id_008_tipo: 5,
          id_usuario_creador: 6,
          telefono2: null
        },
        
        descripción_solicitante: null,
        id_ubigeo: null,
        departamento: null,
        provincia: null
      },
      listUpAsesoriaAbogado: {
        id_asesoria_abogado:  null,
        respuesta: null
      },
      rules: {
        descripción_solicitante: [
          { required: true, message: 'Responda la asesoria', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
  },
  methods: {
     updateAsesoriaAbogado(val){
       let bandera = val
       if(bandera==1){
        const endpoint = "/updateAsesoriaAbogado/";
        this.$http.post(endpoint, this.listUpAsesoriaAbogado).then((response) => {
          console.log(response)
        });
        this.actualizarEstado(this.cambiarEstado);
        this.grabarmodal()}
        else{
          this.grabarmodal()
        }
    },
    grabarmodal(){
    if(this.listUpAsesoriaAbogado.respuesta != null){
      if(this.showModal == false){
        this.showModal = true
      }
      else{
        this.showModal = false
      }
      }else{
            this.$message.error("Ingrese una respuesta", {
      duration: 5000
        });
       }
   
    },
    actualizarEstado(val){
      const endpoint = "/asesoria/UpdateEstado"
      this.$http.post(endpoint, val).then((response) => {
        console.log(response)
      });
    },
    getAsesoriaAbogado(){
      const endpoint = '/getAsesoriaAbogado/00/00/00/'+this.id
      this.$http.get(endpoint).then((response) => {
        console.log(" error 1")
        this.listAsesoriaAbogado = response.data.resultado[0]
        this.cambiarEstado.id_asesoria = this.listAsesoriaAbogado.asesoria.id_asesoria
        // if(this.listUpAsesoriaAbogado.respuesta == null){
        //   this.listUpAsesoriaAbogado.respuesta = response.data.resultado[0].asesoria.descripción_asistente
        // }
        console.log(" error 2")
        console.log(response.data.resultado[0])
      })
      .catch((e) => {
        console.log(e);
      });
    },
    // getUbigeo(val) {
    //   if(val == 1) {
    //     this.user.provincia = null
    //     this.user.id_ubigeo = null
    //   } else if (val == 2) {
    //     this.user.id_ubigeo = null
    //   }
    //   this.$http.get(this.endPoint).then((response) => {
    //       if (
    //         this.user.departamento == null &&
    //         this.user.provincia == null &&
    //         this.user.id_ubigeo == null
    //       ) {
    //         this.listDepartamentos = response.data.data;
    //       } else if (
    //         this.user.departamento != null &&
    //         this.user.provincia == null &&
    //         this.user.id_ubigeo == null
    //       ) {
    //         this.listProvincias = response.data.data;
    //       } else if (
    //         this.user.departamento != null &&
    //         this.user.provincia != null &&
    //         this.user.id_ubigeo == null
    //       ) {
    //         this.listDistritos = response.data.data;
    //       }
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    sendData(usuario) {
      if(this.userlogin) {
        this.user.usuario = { 
            ...this.user.usuario, 
            'cuenta': usuario.cuenta,
        }
      } else {
        this.user.usuario = { 
          ...this.user.usuario, 
          'cuenta': usuario.cuenta,
          'clave': usuario.clave,
          'telefono1': usuario.telefono1
        }
      }
        this.$http
          .post('/asesoria/InsertAsesoria',this.user)
          .then((response) => {
            if(!this.userlogin) {
              // alert(2222)
              EventBus.$emit('sendData', this.user.usuario)
            }
            console.log(response)
            this.close()
            this.showModalSend = true
          })
          .catch((e) => {
            console.log(e);
          });
    },
    close() {
      this.showModal = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.single {
  padding-top: 50px;
  &--container {
    max-width: 750px;
    margin: auto;
  }
  .title {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .min-m {
    margin-left: -20px;
    margin-right: -20px;
    display: flex;
    .el-form-item.el-form-item {
      display: inline-block;
      margin: 0 22px 0 22px;
    }
  }
  // .el-select {
  //   margin: 0 22px 0 22px;
  // }
  .back {
    padding-bottom: 20px;
    left: -30px;
    position: relative;
    a {
      text-decoration: none;
      color: #000;
      outline: none;
      display: flex;
      align-items: center;
    }
    i {
      font-size: 25px;
      margin-right: 5px;
    }
  }
  .element-right {
    text-align: right;
  }
}
</style>
<style lang="scss">
.textarea-height {
  textarea {
    height: 200px;
    font-family: "Raleway", sans-serif;
  }
}

@media only screen and (max-width: 600px) {
  .content-modal .modal {
    min-width: inherit;
    max-width: inherit;
    width: 100%;
    padding: 0px !important;
    // height: 100%;
    form {
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 30px;
    }
    .element-two {
      display: block !important;
      > div {
        padding: 0px !important;
      }
      > div:first-child {
        width: 100% !important;
      }
      > div:last-child {
        width: 100% !important;
        max-width: 100% !important;
      }
    }
  }
  .single {
    padding-top: 25px !important;
    .back {
      padding-bottom: 0px !important;
      left: 0px !important;
    }
    // .element-center {
    //   // padding-left: 40px;
    //   // padding-right: 40px;
    //   // padding-top: 40px;
    // }
    .el-form-item__content .el-form-item__content {
      margin: 0 !important;
      margin-bottom: 20px !important;
    }
    .el-select {
      width: 100%;
      // margin: 0 !important;
      // margin-bottom: 20px !important;
    }
    .min-m {
      margin: 0 !important;
      display: block !important;
      .el-form-item.el-form-item {
        display: block !important;
        margin: 0 !important;
        &:last-child {
          margin-bottom: 0px !important;
        }
      }
    }
    &--container {
      margin-left: 25px !important;
      margin-right: 25px !important;
      button {
        width: 100%;
      }
    }
  }
}
</style>