<template>
  <div class="content-modal message">
    <div class="mask"></div>
    <div class="modal">
      <div>
        <h1 class="text-blue">¿Estás seguro de dar esta respuesta?</h1>

      </div>
      <div>
          <el-form ref="form">
            <el-form-item class="element-center event-button">
              <div style="column-count: 2">
                <div>
                  <router-link to="/lawyer">
                    <el-button type="primary" round @click="$emit('grabarmodal',1)">Ok</el-button>
                  </router-link>
                </div>
                <div>
                  <el-button type="primary" round @click="$emit('grabarmodal',2)">Cancelar</el-button>
                </div>
              </div> 
            </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  props:['detail'],
   data () {
    return {
      fechad: '',
    }},
  methods: {
    close2() {
      // this.$router.push({ path: "/horario" });
      window.location.reload()  
    }
  },
  created(){
    
  }
};
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