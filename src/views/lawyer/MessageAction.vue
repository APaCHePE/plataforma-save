<template>
  <div class="content-modal message">
    <div class="mask"></div>
    <div class="modal">
      <span v-if="valOperacion.id_tipo_action==1" style="text-align: center">
          <img style="width: 40%; padding-left: 30%" src="https://blogconclase.files.wordpress.com/2013/04/validar.gif">  
          <h1>Validacion para crear !NUEVO HORARIO¡</h1>
      </span>
      <span  v-if="valOperacion.id_tipo_action==2" style="text-align: center">
          <img style="width: 40%; padding-left: 30%" src="https://blogconclase.files.wordpress.com/2013/04/validar.gif">  
          <h1>Confirmacion para ACTUALIZAR¡</h1>
      </span>
      <span  v-if="valOperacion.id_tipo_action==3" style="text-align: center">
          <img style="width: 20%; padding-left: 40%" src="https://i.pinimg.com/originals/06/b0/d7/06b0d74e5d10dd690cd8ed152e131359.png">  
          <h1>Se eliminara el archivo!</h1>
      </span>
          <!-- <img style="width: 20%; padding-left: 40%" src="https://www.flaticon.es/svg/vstatic/svg/1168/1168682.svg?token=exp=1611425690~hmac=e81fe283e058e0e92659ce0774fdf8df">   -->
      <br>
      <template>
        <el-row :gutter="10">
            <el-col :md="16" v-if="valOperacion.id_tipo_action==1"><el-button type="primary" size="mini"
            @click="agregarHorario()">Confirmar</el-button></el-col>
            <el-col :md="16" v-if="valOperacion.id_tipo_action==2"><el-button type="primary" size="mini"
            @click="actualizarHorario()">Actualizar</el-button></el-col>
            <el-col :md="8" v-if="valOperacion.id_tipo_action==3" style="margin-left: 25%"><el-button type="primary" size="mini"
            @click="eliminarHorario()">Eliminar</el-button></el-col>
            <el-col :md="8" v-if="valOperacion.id_tipo_action==1"><el-button type="danger" size="mini" @click="$emit('activarmodal',5)">Cancelar</el-button></el-col>
            <el-col :md="8" v-if="valOperacion.id_tipo_action==2"><el-button type="danger" size="mini" @click="$emit('activarmodal',2)">Cancelar</el-button></el-col>
            <el-col :md="8" v-if="valOperacion.id_tipo_action==3"><el-button type="danger" size="mini" @click="$emit('activarmodal',3)">Cancelar</el-button></el-col>
        </el-row><br>
      </template>
    </div>
  </div>    
</template>

<script>
export default {
    props:['valOperacion'],
    data(){
        return {
            cambiarEstadoHorario:{
                id_nuevo_horario: null
            }
        }
    },
    created(){
        this.cambiarEstadoHorario.id_nuevo_horario = this.valOperacion.id_valHorarioNuevo
    },
    methods: {
        eliminarHorario(){
            const endpoint = "/cancelarNuevoHorario/";
            this.$http.post(endpoint, this.cambiarEstadoHorario).then((response) => {
                console.log(response)
            });
            this.$emit('activarmodal',null)
        },
        actualizarHorario(){
          const endpoint = "/actualizarNuevoHorario/";
          this.$http.post(endpoint, this.cambiarEstadoHorario.id_nuevo_horario).then((response) => {
            console.log(response)
          });
          this.$emit('activarmodal',4)
        },
        agregarHorario(){
          const endpoint = "/crearNuevoHorario/";
          this.$http.post(endpoint, this.valOperacion.crear).then((response) => {
            console.log(response)
          });
          this.$emit('activarmodal',4)
        }
    }
}
</script>

<style lang="scss" scoped>
  .content-modal.message {
  .modal {
    border-radius: 30px;
    min-width: 280px;
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
  .content-modal.message {
    .modal {
      top: 0;
      transform: none !important;
      left: 0;
      position: absolute;
      width: 100%;
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      .element-center {
        padding: 30px;
      }
    }
  }
}
</style>