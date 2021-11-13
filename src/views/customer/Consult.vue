<template>
  <div class="single">
    <div class="container">
      <div class="single--container">
        <p class="back">
          <router-link to="/"><i class="el-icon-back"></i>Regresar</router-link>
        </p>
        <h1 class="title text-blue">Cuentanos tu problema</h1>
        <div>
          <el-form :label-position="labelPosition" :model="user" label-width="100px" :rules="rules" ref="user" hide-required-asterisk>
             <el-form-item  prop="descripción_solicitante">
              <el-input class="textarea-height" type="textarea" v-model="user.descripción_solicitante" id="texto" ref="texto"
               :autofocus ="true"></el-input>
            </el-form-item>
           <h1 class="title text-blue">¿Donde esta ocurriendo el problema?</h1>
            <el-form-item>
              <div class="min-m">
                <el-form-item prop="departamento">
                  <el-select v-model="user.departamento" filterable placeholder="Departamento" @change="getUbigeo(1)" 
                 >
                    <el-option
                      v-for="(item, index) in listDepartamentos"
                      :key="index"
                      :label="item.nombre"
                      :value="item.codDepartamento"
                      
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="provincia">
                  <el-select v-model="user.provincia" filterable placeholder="Provincia" prop="provincia" @change="getUbigeo(2)"
                  ref="provincia" :autofocus ="true">
                    <el-option
                      v-for="(item, index) in listProvincias"
                      :key="index"
                      :label="item.nombre"
                      :value="item.codProvincia"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="id_ubigeo">
                  <el-select v-model="user.id_ubigeo" filterable placeholder="Distrito" @change="getUbigeo()">
                    <el-option
                      v-for="(item, index) in listDistritos"
                      :key="index"
                      :label="item.nombre"
                      :value="item.idUbigeo"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item class="element-right">
              <el-button type="primary" round @click="send('user')">Enviar</el-button>
            </el-form-item>
          </el-form>
        </div>

        
        <modal-register v-if="showModal" @close="close()" @sendData="sendData"/>
        <modal-message v-if="showModalSend"/>
      </div>
    </div>
  </div>
</template>
<script>
import ModalRegister from '@/views/shared/login/ModalRegister.vue'
import ModalMessage from '@/components/shared/ModalMessage.vue'
import EventBus from '@/helpers/EventBus'
export default {
  props: ['userlogin'],
  components: {
    ModalRegister,
    ModalMessage
  },
  created() {
    document.body.style.backgroundColor = "#fff";
    this.getUbigeo();
    this.escucha();
  },
  data() {
    return {
      labelPosition: "top",
      showModal: null,
      showModalSend: null,
      user: {
        usuario: {
          id_008_tipo: 15,
          id_usuario_creador: 6,
          telefono2: null
        },
        descripción_solicitante: null,
        id_ubigeo: null,
        departamento: null,
        provincia: null
      },
      listDepartamentos: null,
      listProvincias: null,
      listDistritos: null,
      rules: {
        departamento: [
          { required: true, message: 'Seleccione departamento', trigger: 'change' }
        ],
        provincia: [
          { required: true, message: 'Seleccione provincia', trigger: 'change' }
        ],
        id_ubigeo: [
          { required: true, message: 'Seleccione distrito', trigger: 'change' }
        ],
        descripción_solicitante: [
          { required: true, message: 'Cuentanos tu problema', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    endPoint() {
      return (
        "/ubigeo/" +
        (this.user.departamento == null ? "00" : this.user.departamento) +
        "/" +
        (this.user.provincia == null ? "00" : this.user.provincia) +
        "/" +
        (this.user.id_ubigeo == null ? "00" : this.user.id_ubigeo)
      );
    },
  },

  methods: {
    escucha(){
      this.$nextTick(()=> this.$refs.texto.focus());
    },
    getUbigeo(val) {
      if(val == 1) {
        this.user.provincia = null
        this.user.id_ubigeo = null
      } else if (val == 2) {
        this.user.id_ubigeo = null
      }
      this.$http.get(this.endPoint).then((response) => {
          if (
            this.user.departamento == null &&
            this.user.provincia == null &&
            this.user.id_ubigeo == null
          ) {
            this.listDepartamentos = response.data.data;
          } else if (
            this.user.departamento != null &&
            this.user.provincia == null &&
            this.user.id_ubigeo == null
          ) {
            this.listProvincias = response.data.data;
          } else if (
            this.user.departamento != null &&
            this.user.provincia != null &&
            this.user.id_ubigeo == null
          ) {
            this.listDistritos = response.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    sendData(usuario) {
      // console.log(usuario)
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
    send(user) {
       this.$refs[user].validate((valid) => {
        if (valid) {
          if(this.userlogin) {
            this.sendData(this.userlogin)
            } else {
              this.showModal = true
          }
          } else {
            console.log('error submit!!');
            return false;
          }
       })
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