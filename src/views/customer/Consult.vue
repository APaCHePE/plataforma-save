<template>
  <div class="single">
    <div class="container">
      <div class="single--container">
        <p class="back">
          <router-link to="/"><i class="el-icon-back"></i>Regresar</router-link>
        </p>
        <h1 class="title text-blue">Cuentanos tu problema</h1>
        <div>
          <el-form
            :label-position="labelPosition"
            :model="user"
            label-width="100px"
            :rules="rules"
            ref="user"
            hide-required-asterisk
          >
            <el-form-item>
              <div class="min-m">
                <el-form-item prop="problema">
                  <h3 class="title text-blue">Tipo de problema</h3>
                  <el-select
                    v-model="user.idTipoTramite"
                    filterable
                    placeholder="Seleccione"
                    @change="getUbigeo(1)"
                  >
                    <el-option
                      v-for="(item, index) in listTramites"
                      :key="index"
                      :label="item.descripcion"
                      :value="item.idTipoTramite"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="ubicacion">
                  <h3 class="title text-blue">Ubicación de ocurrencia</h3>
                  <el-input
                    type="text"
                    placeholder="Escriba una Av./Calle/Jr./Psje"
                    id="texto"
                    ref="texto"
                    v-model="user.ubicacion"
                    :autofocus="true"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item prop="descripción_solicitante">
              <h3 class="title text-blue">Descripción</h3>
              <el-input
                class="textarea-height"
                type="textarea"
                v-model="user.descripcionTramite"
                id="texto"
                ref="texto"
                :autofocus="true"
              ></el-input>
            </el-form-item>
            <el-form-item prop="respuesta_solicitante">
              <h3 class="title text-blue">Medio de Respuesta</h3>
              <el-radio v-model="radio" label="1">Correo</el-radio><br/>
              <el-input
                v-if="radio == 1"
                class="textarea-height"
                type="text"
                v-model="user.detalleMedioRespuesta"
                id="texto"
                ref="texto"
                :autofocus="true"
              ></el-input>
              <el-radio v-model="radio" label="2">Teléfono</el-radio><br/>
              <el-input
                v-if="radio == 2"
                class="textarea-height"
                type="text"
                v-model="user.detalleMedioRespuesta"
                id="texto"
                ref="texto"
                :autofocus="true"
              ></el-input>
              <el-radio v-model="radio" label="3">Carta</el-radio><br/>
              <el-input
                v-if="radio == 3"
                class="textarea-height"
                type="text"
                v-model="user.detalleMedioRespuesta"
                id="texto"
                ref="texto"
                :autofocus="true"
              ></el-input>
              <el-radio v-model="radio" label="4">No deseo que me respondan</el-radio>
            </el-form-item>
            <p class="formP1">Adjuntar archivos (opcional):</p>
            <p class="formP2">Puedes subir un máximo de 20 MB en fotos, videos y/o textos que ayuden a evidenciar tu reclamo.</p>
            <!-- <el-form-item class="element-left formSubirFile">
              <el-button type="primary" round @click="send('user')"
                >Sube tus archivos</el-button
              >
            </el-form-item> -->
            <el-form-item class="element-right">
              <el-button type="primary" round @click="send('user')"
                >Registrar</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <modal-register
          v-if="showModal"
          @close="close()"
          @sendData="sendData"
        />
        <modal-message v-if="showModalSend" />
      </div>
    </div>
  </div>
</template>
<script>
import ModalRegister from "@/views/shared/login/ModalRegister.vue";
import ModalMessage from "@/components/shared/ModalMessage.vue";
import EventBus from "@/helpers/EventBus";
export default {
  props: ["userlogin"],
  components: {
    ModalRegister,
    ModalMessage,
  },
  created() {
    document.body.style.backgroundColor = "#fff";
    this.getUbigeo();
    this.escucha();
  },
  data() {
    return {
      // variable input radio // una variable de input
      radio: false,
      labelPosition: "top",
      showModal: null,
      showModalSend: null,
      user: {
        idTipoTramite: null,
        ubicacion: null,
        descripcionTramite: null,
        detalleMedioRespuesta: null,
        idUsuarioCreador:5268
      },
      listTramites: [
        {
          idTipoTramite: 1,
          descripcion: "Adulto Mayor",
          asunto: "tramite por Adulto Mayor",
          idUnidadDestino: 11,
        },
        {
          idTipoTramite: 2,
          descripcion: "Discotecas y Bares",
          asunto: "tramite por Discotecas y Bares",
          idUnidadDestino: 12,
        },
        {
          idTipoTramite: 3,
          descripcion: "Tesoreria",
          asunto: "tramite por Tesoreria",
          idUnidadDestino: 13,
        },
        {
          idTipoTramite: 4,
          descripcion: "Fiscalización",
          asunto: "tramite por Fiscalización",
          idUnidadDestino: 13,
        },
        {
          idTipoTramite: 5,
          descripcion: "Limpieza de parques",
          asunto: "tramite por Limpieza de parques",
          idUnidadDestino: 13,
        },
      ],
      listDepartamentos: null,
      listProvincias: null,
      listDistritos: null,
      rules: {
        problema: [
          {
            required: true,
            message: "Seleccione problema",
            trigger: "change",
          },
        ],
        ubicacion: [
          {
            required: true,
            message: "Seleccione ubicacion",
            trigger: "change",
          },
        ],
        descripción_solicitante: [
          { required: true, message: "Cuentanos tu problema", trigger: "change" },
        ],
        respuesta_solicitante: [
          { required: true, message: "Seleccione medio de respuesta", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    // endPoint() {
    //   return (
    //     "/ubigeo/" +
    //     (this.user.departamento == null ? "00" : this.user.departamento) +
    //     "/" +
    //     (this.user.provincia == null ? "00" : this.user.provincia) +
    //     "/" +
    //     (this.user.id_ubigeo == null ? "00" : this.user.id_ubigeo)
    //   );
    // },
  },

  methods: {
    escucha() {
      this.$nextTick(() => this.$refs.texto.focus());
    },
    sendData(usuario) {
      console.log(' sendData', usuario)
      console.log(' sendData', this.userlogin)

      if (this.radio == 1)  this.user.tipoRespuesta = 1;

      if (this.radio == 2)  this.user.tipoRespuesta = 2;

      if (this.radio == 3)  this.user.tipoRespuesta = 3;

      if (this.radio == 4)  this.user.tipoRespuesta = 4;

      this.listTramites.forEach((x) => {
        if (x.idTipoTramite == this.user.idTipoTramite) {
          this.user.asunto = x.asunto;
          this.user.idUnidadDestino = x.idUnidadDestino;
        }
      });

      this.$http
        .post("/solicitud/requerimientos/crear-solicitud", this.user)
        .then((response) => {
          if (!this.userlogin) {
            // alert(2222)
            EventBus.$emit("sendData", this.user.usuario);
          }
          console.log(response);
          this.close();
          this.showModalSend = true;
        })
        .catch((e) => {
          console.log(e);
        });

      // if (this.userlogin) {
      //   this.user.usuario = {
      //     ...this.user.usuario,
      //     cuenta: usuario.cuenta,
      //   };
      // } else {
      //   this.user.usuario = {
      //     ...this.user.usuario,
      //     cuenta: usuario.cuenta,
      //     clave: usuario.clave,
      //     telefono1: usuario.telefono1,
      //   };
      // }
      // this.$http
      //   .post("/asesoria/InsertAsesoria", this.user)
      //   .then((response) => {
      //     if (!this.userlogin) {
      //       // alert(2222)
      //       EventBus.$emit("sendData", this.user.usuario);
      //     }
      //     console.log(response);
      //     this.close();
      //     this.showModalSend = true;
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },
    send(user) {
      console.log("send(user)", this.user);
      this.sendData(this.user);

      this.$refs[user].validate((valid) => {
        if (valid) {
          // if (this.userlogin) {
          //   this.sendData(this.userlogin);
          // } else {
          //   this.showModal = true;
          // }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    close() {
      this.showModal = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.single {
  padding-top: 50px;
  .formP1{
    margin: 45px 0px 15px 0px;
  }
  .formP2{
    margin: 15px 0px 35px 0px;
  }
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
    /* border: 1px solid red; */
    justify-content: space-around;
    .el-form-item.el-form-item {
      width: 50%;
      /* border: 1px solid blue; */
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
      color: #4e4d4d;
      outline: none;
      display: flex;
      align-items: center;
    }
    i {
      font-size: 18px;
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
  .back {
    a {
      color: #4e4d4d;
      font-size: 14px;
    }
    i {
      font-size: 18px !important;
      margin-right: 5px;
    }
  }
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
      border: 1px solid #80808070;
      width: fit-content;
      padding: 3px !important;
      border-radius: 12px;
      /* padding-bottom: 0px !important; */
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
      /* border: 1px solid green; */
      .el-form-item.el-form-item {
        /* border: 1px solid red; */
        display: block !important;
        margin: 0 !important;
        width: 100% !important;
        &:last-child {
          /* border: 1px solid blue; */
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
