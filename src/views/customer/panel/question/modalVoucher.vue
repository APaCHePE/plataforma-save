<template>
<div style="column-count: 1; aling: center;">
  <div style="text-align:center">
 <el-upload
                class="upload-demo"
                ref="upload"
                accept=".pdf, .png, .jpg, .jpeg"
                :limit="1"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false">
                <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
                  <div slot="tip" class="el-upload__tip">Solo 1 archivo doc/docx con un tamaño menor de 500kb</div>
                <!-- <el-button slot="trigger" size="small" type="primary">Selecciona un archivo</el-button> -->
                <!-- <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div> -->
             
              </el-upload></div>
                <div style="text-align:center">
              <el-col><br>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Subir Voucher ↑</el-button>
              </el-col>
</div></div>
</template>

<script>

export default {
  props:['idCita'],
  created() {
   
  },
  data() {
    return {
     
     SubirV:{
        
        id_cita: null
      }
    }
  },
  methods: {
     
    async submitUpload() {

   
    this.SubirV.id_cita = this.idCita
    const url = "/subirVoucher/"
        console.log(this.$refs)
        console.log(this.$refs.upload)
       let file = await this.$refs.upload.uploadFiles[0].raw
      

      const formData = new FormData();

      formData.append('datos',JSON.stringify(this.SubirV));
      formData.append('file',file);
      this.$http.post(url,formData)
            .then(response=>{
                console.log("RESPUESTA SERVICIO");
                console.log(response.data);
                console.log("FILE DE FILE");
                this.$refs.upload.clearFiles()
                this.$emit('reloadList')
                this.$message({
                message: 'Se grabo con exito',
                type: 'success'
              });

              this.$emit('grabarmodal')
           })

  


    },

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
      top: 0;
      transform: none !important;
      left: 0;
      position: absolute;
      height: 100%;
      border-radius: 0;
      .element-two h1 {
        margin-top: 30px;
      }
      form {
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
      }
    }
  }
}
</style>