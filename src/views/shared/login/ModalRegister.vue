<template>
  <div class="content-modal login">
    <div class="mask"></div>
    <div class="modal">
      <span class="close" @click="$emit('close')">
        <img src="@/assets/cerrar.png" alt />
      </span>
      <div class="element-two">
        <div class="element-center">
          <h1 class="text-blue">Registro</h1>
          <img src="@/assets/loginicon.png" alt />
          <p class="description">Llene sus datos para continuar</p>
        </div>
        <div>
          <el-form :model="usuario" :rules="rules" ref="usuario" hide-required-asterisk label-position="top" label-width="120px">
            <el-form-item label="Correo" prop="cuenta">
              <el-input v-model.trim="usuario.cuenta" placeholder="e-mail" ref="correo"
               :autofocus ="true" @keyup.enter.native="escucha1()"></el-input>
            </el-form-item>
            <el-form-item label="Celular" prop="telefono1">
              <el-input v-model.trim="usuario.telefono1" maxlength="9" placeholder="celular" ref="numero"
               :autofocus ="true" @keyup.enter.native="escucha2()"></el-input>
            </el-form-item>
            <el-form-item label="Contraseña" prop="clave">
              <el-input v-model.trim="usuario.clave" type="password" autocomplete="off" ref="clave"
               :autofocus ="true" ></el-input>
            </el-form-item>
            <el-form-item class="element-center event-button b-block">
              <el-button type="primary" round @click="sendData('usuario')"
                >Registrarme</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
          cuenta: null,
          clave: null,
          telefono1: null
        },
      rules: {
        cuenta: [
          { required: true, message: 'Ingrese cuenta', trigger: 'blur' },
          { type: 'email', message: 'Correo no válido', trigger: ['blur', 'change'] }
        ],
        telefono1: [
          { required: true, message: 'Ingrese celular', trigger: 'blur' },
          { min: 9, max: 9, message: 'Número no válido', trigger: 'blur' }
        ],
        clave: [
          { required: true, message: 'Ingrese contraseña', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.escucha();
  },
  methods: {
    escucha(){
      this.$nextTick(()=> this.$refs.correo.focus());
    },
    escucha1(){
      this.$nextTick(()=> this.$refs.numero.focus());
    },
    escucha2(){
      this.$nextTick(()=> this.$refs.clave.focus());
    },
    sendData(usuario) {
      this.$refs[usuario].validate((valid) => {
        if (valid) {
            this.$emit('sendData', this.usuario)
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    }
  }
};
</script>

<style lang="scss">
.content-modal.login {
  .modal {
    border-radius: 30px;
    // min-width: 280px;
    // max-width: 280px;
    margin: auto;
    z-index: 9;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 50px;
    background: white;
    .b-block button{
      width: 100%;
    }
    .element-two {
      display: flex;
      & >div:first-child {
        width: 30%;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
      }
      & >div:last-child {
        width: 70%;
        max-width: 45%;
      }
      & > div {
        padding: 0 33px;
      }
      h1 {
        margin-bottom: 30px;
      }
    }
    .element-center {
      text-align: center;
    }
    .close {
      position: absolute;
      right: 10px;
      cursor: pointer;
      top: 10px;
    }
    .event-button {
      margin-bottom: 0;
      margin-top: 40px;
    }
    .description {
      padding-bottom: 30px;
    }
    .description2 {
      margin-top: 30px;
      font-size: 14px;
      line-height: 1.5;
    }
    .el-form-item__label {
      line-height: normal;
    }
  }
  .mask {
    background: #0000009e;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
@media only screen and (max-width: 600px) {
  .content-modal.login {
    .modal {
      width: 95%;
    }
    .element-two {
      flex-direction: column;
      > div {
        padding: 0px !important;
      }
      > div:last-child {
        width: 100% !important;
        max-width: initial !important;
      }
      .element-center {
        width: 100% !important;
        margin-top:20px;
     
       
      }
    }
  }
}
</style>