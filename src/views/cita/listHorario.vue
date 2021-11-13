<template>
  <div class="light">
    <nav>
      <div class="container">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">Mis Horario</el-menu-item>
        </el-menu>
      </div>
    </nav>
    <div class="single">
      <div class="container">
        <div class="single--container">
          <p class="back">
            <a href="javascript:;" @click="$router.go(-1)">
              <i class="el-icon-back"></i>Regresar
            </a>
          </p>
          <h1 class="title text-blue">Mis Consultas</h1>
          <div>
           
            <el-card shadow="always">
              <el-table
                :data="dia1"
                style="width: 100%">

                <el-table-column
                  prop="dia"
                  label="Lunes">
                </el-table-column>

                <el-table-column
                  prop="dia"
                  label="Martes">
                </el-table-column>

                <el-table-column
                  prop="dia"
                  label="Miercoles">
                </el-table-column>

                <el-table-column
                  prop="dia"
                  label="Jueves">
                </el-table-column>

                <el-table-column
                  prop="dia"
                  label="Viernes">
                </el-table-column>

                <!-- <el-table-column
                  prop="id_005_estado"
                  label="Estado"> -->
                  <!--<template slot-scope="scope">
                   <router-link :to="`/text/${scope.row.id_asesoria_abogado}`" class="card">
                      <el-button v-if="scope.row.respuesta == null" size="mini" type="warning">Responder</el-button> 
                      <el-button v-else size="mini" type="primary">Ver respuesta</el-button> 
                    </router-link>
                  </template>-->
                <!-- </el-table-column> -->
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
  props:['userlogin'],
  data () {
    return {
     dia1: []
    //  dia2: [],
    //  dia3: [],
    //  dia4: [],
    //  dia5: []
    }
  },
  created() {
      this.horarios1()
    //   this.horarios2()
    //   this.horarios3()
    //   this.horarios4()
    //   this.horarios5()
   
  },
  methods: {

      horarios1(){
          const endpoint = '/getHorario/00/00/0/'+0
          this.$http.get(endpoint).then((response) => { 
              this.dia1 = response.data.resultado
              console.log(this.dia1)
          })
      .catch((e) => {
        console.log(e);
      });
      }
    //   ,
    //   horarios2(){
    //       const endpoint = '/getHorario/00/00/0/'+2
    //       this.$http.get(endpoint).then((response) => { 
    //          this.dia2 = response.data.resultado
    //          console.log(this.dia2)
    //       })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    //   },
    //   horarios3(){
    //       const endpoint = '/getHorario/00/00/0/'+3
    //       this.$http.get(endpoint).then((response) => { 
    //         this.dia3 = response.data.resultado
    //       })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    //   },
    //   horarios4(){
    //       const endpoint = '/getHorario/00/00/0/'+4
    //       this.$http.get(endpoint).then((response) => { 
    //         this.dia4 = response.data.resultado 
    //       })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    //   },
    //   horarios5(){
    //       const endpoint = '/getHorario/00/00/0/'+5
    //       this.$http.get(endpoint).then((response) => { 
    //         this.dia5 = response.data.resultado 
    //       })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    //   },

   /* getQuestions() {
      // const endpoint = '/getAsesoria/00/'+this.userlogin.id_usuario+'/00/00'
      const endpoint = '/getAsesoriaAbogado/00/00/'+this.userlogin.id_usuario+'/00'
      this.$http.get(endpoint).then((response) => {
        this.listQuestion = response.data.resultado
        //console.log(response)
      })
      .catch((e) => {
        console.log(e);
      });
    }*/
  }
};
</script>

<style lang="scss">
header {
  display: flex;
  background: #ddf3ff;
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
    // .flex-content {
    //   display: flex;
    //   margin-left: -10px;
    //   margin-right: -10px;
    //   flex-flow: wrap;
    // }
  }
}
</style>