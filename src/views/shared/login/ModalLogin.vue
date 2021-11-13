<template>
  <div class="content-modal login">
    <div class="mask"></div>
    <div class="modal">
      <span class="close" @click="$emit('close', false)">
        <img src="@/assets/cerrar.png" alt />
      </span>
      <div class="element-two">
        <div class="element-center">
          <h1 class="text-blue">Ingresar</h1>
          <img src="@/assets/loginicon.png" alt />
          <p class="description">Acceda a su panel personal</p>
        </div>
        <div>
          <el-form  :model="usuario" :rules="rules" ref="usuario" hide-required-asterisk label-position="top" label-width="120px">
            <el-form-item label="Correo" prop="cuenta">
              <el-input v-model.trim="usuario.cuenta" placeholder="e-mail"></el-input>
            </el-form-item>
            <el-form-item label="Contraseña" prop="clave">
              <el-input v-model.trim="usuario.clave" type="password" autocomplete="off" @keyup.enter.native="validData('usuario')"></el-input>
            </el-form-item>
            <el-form-item class="element-center event-button b-block">
              <el-button type="primary" round @click="validData('usuario')"
                >Ingresar</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/helpers/EventBus'
export default {
  created() {
    EventBus.$on('sendData', (val) => {
        this.sendData(val)
    })
    // this.escucha()
  },
  data() {
    return {
      usuario: {
          cuenta: null,
          clave: null
        },
      rules: {
        cuenta: [
          { required: true, message: 'Ingrese cuenta', trigger: 'blur' },
          { type: 'email', message: 'Correo no válido', trigger: ['blur', 'change'] }
        ],
        clave: [
          { required: true, message: 'Ingrese contraseña', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // escucha(){
    //   this.$nextTick(()=> this.$refs.usuario.focus());
    // },
    sendData(val) {
       console.log("************************************")
      console.log(val)
      const endpoint = "/usuario/getLoginUsuario/"
      this.$http.post(endpoint, val).then((response) => {
        if(response.data.success) {
          console.log(response)
          this.$emit('close', false)
          this.$emit('login', response.data.resultado[0])
          if(val?.redirecEmail){
            if(val.tipo == 1){
              this.$router.push('/lawyer')
            }
            else{
              this.$router.push('/panel')
            }
          }
        } else {
          this.$message.error('Usuario o clave incorrecto')
        }
      });
    },
    validData(usuario) {
      this.$refs[usuario].validate((valid) => {
        if (valid) {
            this.sendData(this.usuario)
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
      width: 70%;
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
        img {
          display: none;
        }
      }
    }
  }
}
</style>