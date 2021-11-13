<template>
  <div class="content-modal message">
    <div class="mask"></div>
    <div class="modal">
      <span class="close" @click="close2()">
        <img src="@/assets/cerrar.png" alt />
      </span>
      <div class="element-center">
        <h1 class="text-blue">¡Se reservo la cita con exito! </h1><br>
        <img style="width: 50%" src="https://images.vexels.com/media/users/3/157893/isolated/lists/d6f4e679138673eb3223362c70ecf7ce-icono-de-marca-de-verificacion.png" alt />
        <br><p class="description2">
          Hola {{user}}, le llegara una confirmacion con las especificaciones se su cita al correo. Gracias por confiar en Tuasesorlegal.pe
        </p>
      </div>
      <!-- <el-form ref="form">
        <el-form-item class="element-center event-button">
          <el-button type="primary" round @click="close2()">Confirmar</el-button>
        </el-form-item>
      </el-form> -->
    </div>
  </div>
</template>

<script>
export default {
  
  props:['user'],
  methods: {
    close2() {
    this.$router.push({ path: "/panel" });
    }
  }
};
</script>

<style lang="scss" scoped>
.content-modal.message {
  .modal {
    border-radius: 30px;
    min-width: 280px;
    max-width: 280px;
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