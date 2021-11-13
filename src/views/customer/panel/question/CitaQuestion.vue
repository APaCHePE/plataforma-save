<template>
  <div class="single">
    <div class="container">
      <div class="single--container">
        <p class="back">
            <a href="javascript:;" @click="$router.go(-1)">
              <i class="el-icon-back"></i>Regresar
            </a>
        </p>
        <h1 class="title text-blue">Respuesta para tu Asesoria</h1>
        <p>
            {{( listAsesoriaAbogado == null || listAsesoriaAbogado==undefined || listAsesoriaAbogado.length==0 ) ? '' : listAsesoriaAbogado.ubigeo2.nombre}} -
            {{( listAsesoriaAbogado == null || listAsesoriaAbogado==undefined || listAsesoriaAbogado.length==0 ) ? '' : listAsesoriaAbogado.ubigeo1.nombre}} -
            {{( listAsesoriaAbogado == null || listAsesoriaAbogado==undefined || listAsesoriaAbogado.length==0 ) ? '' : listAsesoriaAbogado.ubigeo.nombre}}
        </p><br>
        <output>
          {{( listAsesoriaAbogado == null || listAsesoriaAbogado==undefined || listAsesoriaAbogado.length==0 ) ? '' : listAsesoriaAbogado.asesoria.descripción_solicitante}}
        </output>
        <div>
          <el-form :label-position="labelPosition" :model="listUpAsesoriaAbogado" label-width="100px" ref="listUpAsesoriaAbogado" hide-required-asterisk>
            <el-form-item label="Respuesta" prop="descripción_solicitante">
                <output>
                {{( listAsesoriaAbogado == null || listAsesoriaAbogado==undefined || listAsesoriaAbogado.length==0 ) ? '' : listAsesoriaAbogado.descripción_asistente}}
                </output>
            </el-form-item>
            <el-form-item class="element-right">
              <router-link :to="`/cita/${( listAsesoriaAbogado == null || listAsesoriaAbogado==undefined || listAsesoriaAbogado.length==0 ) ? '' : listAsesoriaAbogado.id_asesoria_abogado}`">
                <el-button type="primary" round >Reservar cita</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props:['id','userlogin'],
  components: {
  },
  created() {
    document.body.style.backgroundColor = "#fff";
    this.getAsesoriaAbogado();
    this.listUpAsesoriaAbogado.id_asesoria_abogado = this.id;
  },
  data() {
    return {
      envio: '',
      listAsesoriaAbogado: null,
      labelPosition: "top",
      showModal: null,
      showModalSend: null,
      listUpAsesoriaAbogado: {
        id_asesoria_abogado:  'null',
        respuesta: null
      }
    };
  },
  computed: {
  },
  methods: {
    getAsesoriaAbogado(){
      let id = this.$route.params.id;
      const endpoint = '/getAsesoriaAbogado/00/00/00/'+id
      this.$http.get(endpoint).then((response) => {
        this.listAsesoriaAbogado = response.data.resultado[0]
        if(this.listUpAsesoriaAbogado.respuesta == null){
          this.listUpAsesoriaAbogado.respuesta = response.data.resultado[0].asesoria.descripción_asistente
        }
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