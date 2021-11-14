<template>
  <div class="light">
    <nav>
      <div class="container">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">Mis Consultas</el-menu-item>
        </el-menu>
      </div>
    </nav>
    <div class="single" v-if="detail">
      <div class="container">
        <div class="single--container">
          <p class="back">
            <a href="javascript:;" @click="$router.go(-1)">
              <i class="el-icon-back"></i>Regresar
            </a>
          </p>
          <h1 class="title text-blue">
            Respuestas de Consulta - Asesoria {{ $route.params.id }}
          </h1>
          <p>
            {{detail[0].ubigeo2.nombre}} - {{detail[0].ubigeo1.nombre}} - {{detail[0].ubigeo.nombre}}
          </p><br>
          <el-card shadow="always">
            {{ detail[0].asesoria.descripción_solicitante }}
          </el-card>
          <div style="margin-top:20px">
            <el-card shadow="always">



              <el-table :data="listaAsesoriaAbo" style="width: 100%" class="desk">
                <el-table-column prop="descripcionAsistenteRecortado" label="Respuestas del caso" width="600">
                </el-table-column>
                <el-table-column prop="id_005_estado" label="Aciones">
                  <template slot-scope="scope">
                    <div v-if="scope.row.id_001_estado == 2">
                      <router-link :to="`/panel/cita-question/${scope.row.id_asesoria_abogado}`" class="card">
                      <el-button size="mini" type="success">Me interesa</el-button>
                      </router-link>
                    </div>
                    <div v-else>
                      <el-button size="mini" type="warning" disabled>reservado</el-button>
                    </div>     
                  </template>
                </el-table-column>
              </el-table>




              <el-table :data="listaAsesoriaAbo" style="width: 100%" class="mobile">
                
                <el-table-column prop="id_005_estado" type="expand">
                  <template slot-scope="scope">
                    <p style="color: #3a7bdd">Aciones</p><br>
                    <div v-if="scope.row.id_001_estado == 2">
                      <router-link :to="`/panel/cita-question/${scope.row.id_asesoria_abogado}`" class="card">
                      <el-button size="mini" type="success">Me interesa</el-button>
                      </router-link>
                    </div>
                    <div v-else>
                      <el-button size="mini" type="warning" disabled>reservado</el-button>
                    </div>     
                  </template>
                </el-table-column>
                <el-table-column prop="descripcionAsistenteRecortado" label="Respuestas del caso" width="600">
                </el-table-column>
              </el-table>



            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: null,
      listaAsesoriaAbo: null
    };
  },
  created() {
   
    this.getDetail();
    this.getDetail1();
  },
  methods: {
      
  getDetail1() {
      let id = this.$route.params.id;
      const endpoint = "/getAsesoriaAbogado/" + id + "/00/00/00";
      this.$http.get(endpoint).then((response) => {
          response.data.resultado.forEach(element => {
            element.descripcionAsistenteRecortado = this.recortar(element.descripción_asistente)
          });
          let data = response.data.resultado;
          let array = [];
           if(data!=null){
          data.forEach(item => {
            if(item.descripción_asistente != null){
             
              array.push(item)
            }
          });
        }
        this.listaAsesoriaAbo = array
        console.log(this.listaAsesoriaAbo)
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDetail() {
      let id = this.$route.params.id;
      const endpoint = "/getAsesoriaAbogado/" + id + "/00/00/00";
      this.$http.get(endpoint).then((response) => {
          response.data.resultado.forEach(element => {
            element.descripcionAsistenteRecortado = this.recortar(element.descripción_asistente)
          });
          this.detail = response.data.resultado;
          console.log(this.detail)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    recortar(texto){
      console.log(texto)
      var textoRecortado
      if(texto == undefined||texto.length <= 90 ){
        textoRecortado = texto
      }else{
        textoRecortado = texto.substring(0,185) + '...';
      }

      return textoRecortado;
    }
  },
};
</script>

<style lang="scss">
header {
  display: flex;
  // background: #ddf3ff;
}
.desk{
  display:inline-block
}
.mobile{
  display:none
}
.light {
  .bottom {
    &:before {
      width: 120%;
      height: 100%;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      background: #fff;
      content: "";
      position: fixed;
      z-index: -1;
      left: -10%;
      top: 57%;
    }
    .card {
      text-decoration: none;
      max-width: 450px;
      margin: auto auto 40px auto;
      background: #3a7bdd;
      border-radius: 18px;
      padding: 30px;
      display: flex;
      overflow: hidden;
      position: relative;
      &:hover {
        box-shadow: 0 4px 25px hsl(216deg 71% 55%);
        transition: box-shadow 0.4s;
        &:before {
          right: 0px;
          transition: right 0.4s;
        }
        i {
          right: -30px;
          transition: right 0.4s;
        }
      }
      &.b-green {
        background: #2adbb8;
      }
      &-right {
        color: #fff;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &:before {
          width: 1px;
          left: -23px;
          content: "";
          background: #ffffff3d;
          height: 105px;
          position: absolute;
          // top: -15px;
        }
      }
      &-left {
        padding-right: 45px;
        // img {
        //   width: 80px;
        // }
      }
      h1 {
        font-size: 20px;
        padding-bottom: 15px;
      }
      i {
        position: absolute;
        right: -55px;
        transition: right 0.4s;
        font-size: 25px;
      }
      &:before {
        width: 150px;
        height: 132px;
        shape-outside: circle(27% at 51%);
        clip-path: circle(45% at 115%);
        background: #ffffff57;
        content: "";
        position: absolute;
        right: -45px;
        top: 15px;
        transition: right 0.4s;
      }
    }
  }
  .description {
    display: block;
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
  nav {
    background: #a1dcff;
  }
  .btn {
    padding: 10px 25px;
    margin: 10px;
    color: #fff;
    background: #2adbb8;
    outline: none;
    text-decoration: none;
    border-radius: 20px;
  }
  .single {
    padding-top: 30px;
    &--container {
      max-width: 930px;
      margin: auto;
      .el-alert {
        margin-bottom: 30px;
      }
    }
    .title {
      margin-bottom: 30px;
      margin-top: 0px;
      display: inline-block;
      font-weight: 600;
      left: -15px;
      position: relative;
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
      padding-bottom: 0px;
      left: -30px;
      position: relative;
      border-right: solid 1px #c7c7c7;
      padding-right: 15px;
      display: inline-block;
      top: 3px;
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
    .flex-content {
      display: flex;
      margin-left: -10px;
      margin-right: -10px;
      flex-flow: wrap;
      .box-card {
        width: 210px;
        font-size: 13px;
        margin-left: 10px;
        margin-right: 10px;
        .clearfix {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .light {
    .single {
      .back{  
        left: 0px !important;
        top: -5px !important;
      }
      .title {
        left: 7px;
      }
      .el-card {
        .el-card__body {
          .desk{
            display:none
          }
          .mobile{
            display:inline-block;
            left: -18px !important;
          }
          .el-table__body-wrapper {
            .el-table_1_column_2 {
              display:inline-block
            }
          }
        }
      }
    }
  }
}
</style>